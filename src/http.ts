import { type CookieStore, MemoryCookieStore } from "./cookies.js";
import {
  ApiError,
  NetworkError,
  TimeoutError,
  handleError,
} from "./error.js";
import { RateLimiter } from "./rate-limit.js";
import type { HttpMethod } from "./types/common.js";

export interface HttpClientOptions {
  /** Готовый Playerok token. Имеет приоритет над cookies из хранилища. */
  token?: string;
  /** Таймаут одного HTTP-запроса в миллисекундах. По умолчанию 30 секунд. */
  timeout?: number;
  /** Количество повторных попыток для безопасных методов. По умолчанию 2. */
  retries?: number;
  /** Базовая задержка между повторными попытками в миллисекундах. */
  retryDelay?: number;
  /** Хранилище cookies. По умолчанию используется `MemoryCookieStore`. */
  cookieStore?: CookieStore;
  /** Максимальное число параллельных запросов. */
  maxConcurrent?: number;
  /** Минимальный интервал между стартами запросов в миллисекундах. */
  minInterval?: number;
  /** Пользовательская реализация fetch, полезная для тестов и прокси-обёрток. */
  fetch?: typeof fetch;
}

export interface RequestOptions {
  /** Внешний сигнал отмены запроса. */
  signal?: AbortSignal;
}

const RETRYABLE_METHODS = new Set<HttpMethod>([
  "GET",
  "PUT",
  "DELETE",
]);

/**
 * Низкоуровневый HTTP-клиент Playerok.
 *
 * Автоматически добавляет token/cookies, сохраняет `Set-Cookie`, ограничивает
 * параллельность, применяет timeout и повторяет подходящие запросы.
 */
export class HttpClient {
  private readonly cookies: CookieStore;
  private readonly limiter: RateLimiter;
  private readonly fetchImpl: typeof fetch;
  private readonly timeout: number;
  private readonly retries: number;
  private readonly retryDelay: number;

  private token: string | undefined;

  /**
   * @param baseUrl Базовый URL без завершающего пути метода.
   * @param optionsOrToken Настройки клиента либо строка token для совместимости.
   */
  constructor(
    private readonly baseUrl: string,
    optionsOrToken?: HttpClientOptions | string,
  ) {
    const options: HttpClientOptions =
      typeof optionsOrToken === "string"
        ? { token: optionsOrToken }
        : (optionsOrToken ?? {});

    this.token = options.token;
    this.timeout = options.timeout ?? 30_000;
    this.retries = options.retries ?? 2;
    this.retryDelay = options.retryDelay ?? 500;
    this.cookies = options.cookieStore ?? new MemoryCookieStore();
    this.fetchImpl = options.fetch ?? globalThis.fetch;

    this.limiter = new RateLimiter({
      maxConcurrent: options.maxConcurrent,
      minInterval: options.minInterval,
    });
  }

  /** Заменяет token, который будет отправляться в cookie следующих запросов. */
  setToken(token: string | undefined): void {
    this.token = token;
  }

  private buildHeaders(
    isFormData: boolean,
  ): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    if (this.token) {
      headers.Cookie = `token=${this.token}`;
    } else {
      const entries = this.cookies.entries();

      if (entries.length > 0) {
        headers.Cookie = entries
          .map(([key, value]) => `${key}=${value}`)
          .join("; ");
      }
    }

    return headers;
  }

  private storeSetCookies(response: Response): void {
    const setCookies: string[] =
      response.headers.getSetCookie?.() ?? [];

    for (const cookie of setCookies) {
      const pair = cookie.split(";")[0];

      if (!pair) {
        continue;
      }

      const index = pair.indexOf("=");

      if (index === -1) {
        continue;
      }

      const key = pair.slice(0, index);
      const value = pair.slice(index + 1);

      this.cookies.set(key, value);
    }
  }

  private async request<T>(
    method: HttpMethod,
    path: string,
    body?: unknown,
    reqOptions?: RequestOptions,
  ): Promise<T> {
    return this.limiter.run(() =>
      this.dispatch<T>(
        method,
        path,
        body,
        reqOptions,
      ),
    );
  }

  private async dispatch<T>(
    method: HttpMethod,
    path: string,
    body?: unknown,
    reqOptions?: RequestOptions,
  ): Promise<T> {
    const isFormData =
      typeof FormData !== "undefined" &&
      body instanceof FormData;

    const options: RequestInit = {
      method,
      headers: this.buildHeaders(isFormData),
    };

    if (body !== undefined) {
      options.body = isFormData
        ? body
        : JSON.stringify(body);
    }

    let lastError: unknown;

    for (
      let attempt = 0;
      attempt <= this.retries;
      attempt++
    ) {
      const controller = new AbortController();

      const timer = setTimeout(
        () => controller.abort(),
        this.timeout,
      );

      const onExternalAbort = () => {
        controller.abort();
      };

      reqOptions?.signal?.addEventListener(
        "abort",
        onExternalAbort,
        { once: true },
      );

      try {
        const response = await this.fetchImpl(
          `${this.baseUrl}${path}`,
          {
            ...options,
            signal: controller.signal,
          },
        );

        this.storeSetCookies(response);

        if (!response.ok) {
          const data = await this.readJson(response);
          const retryAfter =
            this.parseRetryAfter(response);

          if (
            this.shouldRetry(
              method,
              response.status,
              attempt,
            )
          ) {
            lastError = new ApiError(
              response.status,
              `Request failed with status ${response.status}`,
              path,
              data,
            );

            await this.delay(
              attempt,
              retryAfter,
            );

            continue;
          }

          handleError(
            response.status,
            path,
            data,
            retryAfter,
          );
        }

        if (response.status === 204) {
          return null as T;
        }

        return (await this.readJson(response)) as T;
      } catch (error) {
        // Ошибки API уже обработаны.
        // Не превращаем их в NetworkError.
        if (error instanceof ApiError) {
          throw error;
        }

        if (
          controller.signal.aborted &&
          !reqOptions?.signal?.aborted
        ) {
          lastError = new TimeoutError(
            path,
            this.timeout,
          );
        } else if (
          reqOptions?.signal?.aborted
        ) {
          throw error;
        } else {
          lastError = new NetworkError(
            path,
            error,
          );
        }

        if (
          RETRYABLE_METHODS.has(method) &&
          attempt < this.retries
        ) {
          await this.delay(attempt);
          continue;
        }

        throw lastError;
      } finally {
        clearTimeout(timer);

        reqOptions?.signal?.removeEventListener(
          "abort",
          onExternalAbort,
        );
      }
    }

    throw lastError instanceof Error
      ? lastError
      : new NetworkError(path, lastError);
  }

  private async readJson(
    response: Response,
  ): Promise<unknown> {
    const contentType =
      response.headers.get("content-type");

    if (
      !contentType?.includes(
        "application/json",
      )
    ) {
      return null;
    }

    return response.json().catch(() => null);
  }

  private shouldRetry(
    method: HttpMethod,
    status: number,
    attempt: number,
  ): boolean {
    if (attempt >= this.retries) {
      return false;
    }

    if (!RETRYABLE_METHODS.has(method)) {
      return false;
    }

    return (
      status === 429 ||
      status >= 500
    );
  }

  private parseRetryAfter(
    response: Response,
  ): number | undefined {
    const header =
      response.headers.get("Retry-After");

    if (!header) {
      return undefined;
    }

    const seconds = Number(header);

    return Number.isFinite(seconds)
      ? seconds
      : undefined;
  }

  private delay(
    attempt: number,
    retryAfterSeconds?: number,
  ): Promise<void> {
    const ms =
      retryAfterSeconds !== undefined
        ? retryAfterSeconds * 1000
        : this.retryDelay * 2 ** attempt;

    return new Promise((resolve) =>
      setTimeout(resolve, ms),
    );
  }

  /** Выполняет GET-запрос и возвращает разобранный JSON-ответ. */
  async get(
    path: string,
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.request(
      "GET",
      path,
      undefined,
      options,
    );
  }

  /** Выполняет POST-запрос с JSON или `FormData`. */
  async post(
    path: string,
    body: unknown,
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.request(
      "POST",
      path,
      body,
      options,
    );
  }

  /** Выполняет PUT-запрос с JSON или `FormData`. */
  async put(
    path: string,
    body: unknown,
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.request(
      "PUT",
      path,
      body,
      options,
    );
  }

  /** Выполняет DELETE-запрос. */
  async delete(
    path: string,
    options?: RequestOptions,
  ): Promise<unknown> {
    return this.request(
      "DELETE",
      path,
      undefined,
      options,
    );
  }
}
