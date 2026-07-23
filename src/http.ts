import { handleError } from "./error.js";
import type { HttpMethod } from "./types/common.js";

export class HttpClient {
  private cookies = new Map<string, string>();

  constructor(
    private baseUrl: string,
    private token?: string,
  ) {}

  private async request<T>(method: HttpMethod, path: string, body?: unknown): Promise<T> {
    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

    const options: RequestInit = {
      method,
      headers: {
        Accept: "application/json",
      },
    };

    if (!isFormData) {
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };
    }

    if (this.token) {
      options.headers = {
        ...options.headers,
        Cookie: `token=${this.token}`,
      };
    } else if (this.cookies.size > 0) {
      options.headers = {
        ...options.headers,
        Cookie: [...this.cookies.entries()].map(([k, v]) => `${k}=${v}`).join(";"),
      };
    }

    if (body !== undefined) {
      options.body = isFormData ? (body as FormData) : JSON.stringify(body);
    }

    const r = await fetch(`${this.baseUrl}${path}`, options);

    const data = r.status === 204 ? null : await r.json().catch(() => null);

    const headers = r.headers;

    const setCookies: string[] = headers.getSetCookie?.() ?? [];

    for (const cookie of setCookies) {
      const pair = cookie.split(";")[0];

      if (!pair) {
        continue;
      }

      const index = pair.indexOf("=");

      if (index !== -1) {
        const key = pair.slice(0, index);
        const value = pair.slice(index + 1);

        this.cookies.set(key, value);
      }
    }

    if (!r.ok) {
      handleError(r.status, path, data);
    }

    return data as T;
  }

  async get<T>(path: string): Promise<T> {
    return this.request<T>("GET", path);
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>("POST", path, body);
  }
  async put<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>("PUT", path, body);
  }
  async delete<T>(path: string): Promise<T> {
    return this.request<T>("DELETE", path);
  }
}
