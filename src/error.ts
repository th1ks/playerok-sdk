import { ApiErrorSchema } from "./types/common.js";

/** Базовая ошибка HTTP-ответа Playerok API. */
export class ApiError extends Error {
  override name = "ApiError";

  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly path: string,
    public readonly data?: unknown,
  ) {
    super(message);
  }
}

/** Ошибка 401: отсутствует или недействительна авторизация. */
export class UnauthorizedError extends ApiError {
  override name = "UnauthorizedError";
}

/** Ошибка 403: операция запрещена текущему пользователю. */
export class ForbiddenError extends ApiError {
  override name = "ForbiddenError";
}

/** Ошибка 404: ресурс не найден. */
export class NotFoundError extends ApiError {
  override name = "NotFoundError";
}

/** Ошибка ответа сервера с кодом 5xx. */
export class ServerError extends ApiError {
  override name = "ServerError";
}

/** Ошибка ответа сервера с кодом 409. */
export class ConflictError extends ApiError {
  override name = "ConflictError";
}

/** Ошибка 429 с необязательной задержкой `retryAfter`. */
export class RateLimitError extends ApiError {
  override name = "RateLimitError";

  constructor(
    statusCode: number,
    message: string,
    path: string,
    data?: unknown,
    public readonly retryAfter?: number,
  ) {
    super(statusCode, message, path, data);
  }
}

/** Преобразует HTTP-статус и тело ответа в специализированное исключение. */
export function handleError(
  status: number,
  path: string,
  data: unknown,
  retryAfter?: number,
): never {
  const parsed = ApiErrorSchema.safeParse(data);

  const message = parsed.success
    ? parsed.data.message
    : `Request failed with status ${status}`;

  switch (status) {
    case 401:
      throw new UnauthorizedError(status, message, path, data);

    case 403:
      throw new ForbiddenError(status, message, path, data);

    case 404:
      throw new NotFoundError(status, message, path, data);

    case 409:
      throw new ConflictError(status, message, path, data)

    case 429:
      throw new RateLimitError(
        status,
        message,
        path,
        data,
        retryAfter,
      );

    default:
      if (status >= 500) {
        throw new ServerError(status, message, path, data);
      }

      throw new ApiError(status, message, path, data);
  }
}

/** Запрос не завершился за настроенное время. */
export class TimeoutError extends Error {
  override name = "TimeoutError";

  constructor(
    public readonly path: string,
    public readonly timeout: number,
  ) {
    super(`Request to ${path} timed out after ${timeout}ms`);
  }
}

/** Сетевая ошибка, возникшая до получения корректного HTTP-ответа. */
export class NetworkError extends Error {
  override name = "NetworkError";

  constructor(
    public readonly path: string,
    public override readonly cause?: unknown,
  ) {
    super(`Network request to ${path} failed`);
  }
}

/** API вернул успешный ответ неожиданной структуры. */
export class UnexpectedResponseError extends Error {
  override name = "UnexpectedResponseError";

  constructor(
    message: string,
    public readonly path?: string,
    public readonly data?: unknown,
  ) {
    super(message);
  }
}

/** Ошибка проверки пользовательского значения или поля. */
export class ValidationError extends Error {
  override name = "ValidationError";

  constructor(
    public readonly field: string,
    message: string,
  ) {
    super(message);
  }
}
