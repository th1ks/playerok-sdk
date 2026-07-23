export class GeneralError extends Error {
	constructor(
		public readonly code: number,
		public readonly path: string,
		public readonly data?: unknown,
	) {
		super(GeneralError.extractMessage(data) ?? `API Error ${code}: ${path}`);

		this.name = "GeneralError";
	}

	private static extractMessage(data?: unknown): string | undefined {
		if (typeof data === "object" && data !== null && "message" in data) {
			return String(data.message);
		}

		return undefined;
	}
}

export function handleError(code: number, path: string, data?: unknown): never {
	switch (code) {
		case 404:
			throw new NotFoundError(code, path, data);
		case 401:
			throw new UnauthorizedError(code, path, data);
		case 403:
			throw new ForbiddenError(code, path, data);
	}
	if (code >= 500) {
		throw new ServerError(code, path, data);
	}

	throw new GeneralError(code, path, data);
}

export class UnauthorizedError extends GeneralError {
	override name = "UnauthorizedError";
}
export class NotFoundError extends GeneralError {
	override name = "NotFoundError";
}
export class ForbiddenError extends GeneralError {
	override name = "ForbiddenError";
}
export class ServerError extends GeneralError {
	override name = "ServerError";
}

export class ValidationError extends Error {
	constructor(
		public field: string,
		message: string,
	) {
		super(message);
	}
}
