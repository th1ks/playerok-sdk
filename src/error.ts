import { ApiErrorSchema } from "./types/common.js";

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

export class UnauthorizedError extends ApiError {
  override name = "UnauthorizedError";
}

export class ForbiddenError extends ApiError {
  override name = "ForbiddenError";
}

export class NotFoundError extends ApiError {
  override name = "NotFoundError";
}

export class ServerError extends ApiError {
  override name = "ServerError";
}

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

export class TimeoutError extends Error {
  override name = "TimeoutError";

  constructor(
    public readonly path: string,
    public readonly timeout: number,
  ) {
    super(`Request to ${path} timed out after ${timeout}ms`);
  }
}

export class NetworkError extends Error {
  override name = "NetworkError";

  constructor(
    public readonly path: string,
    public override readonly cause?: unknown,
  ) {
    super(`Network request to ${path} failed`);
  }
}

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

export class ValidationError extends Error {
  override name = "ValidationError";

  constructor(
    public readonly field: string,
    message: string,
  ) {
    super(message);
  }
}
