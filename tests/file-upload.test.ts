import { describe, expect, it, vi } from "vitest";
import { FileAPI } from "../src/api/fille.js";
import { ServerError } from "../src/error.js";
import type { HttpClient } from "../src/http.js";

/**
 * Tests for the file-upload flow (src/api/fille.ts).
 *
 * The upload is a two-step BFF flow:
 *   1. GET  /file/v1/upload-url        -> { url, fields, file_id }
 *   2. POST /file/v1/upload/{file_id}  <- multipart form (fields + file)
 *   3. POST /file/v1/confirm-upload    <- { id: file_id }
 *
 *   Bug #3 — PRESENT (test FAILS): `new ServerError(500, "...message...")` puts
 *            the human message into the `path` field instead of `.message`.
 *   The missing-`file_id` guard is also covered as a regression guard.
 */

const UPLOAD_HUMAN_MESSAGE = "Server don't send fileId field!";

type MockClient = {
	get: ReturnType<typeof vi.fn>;
	post: ReturnType<typeof vi.fn>;
	put: ReturnType<typeof vi.fn>;
	delete: ReturnType<typeof vi.fn>;
};

function createClient(): MockClient {
	return {
		get: vi.fn(),
		post: vi.fn().mockResolvedValue(null),
		put: vi.fn(),
		delete: vi.fn(),
	};
}

/** Shape returned by GET /file/v1/upload-url. */
function uploadUrlResponse(overrides: Record<string, unknown> = {}) {
	return {
		url: "https://bff.playerok.com/upload",
		fields: {
			bucket: "playerok-bucket",
			"X-Amz-Algorithm": "AWS4-HMAC-SHA256",
			"X-Amz-Credential": "cred/20260723/eu/s3/aws4_request",
			"X-Amz-Date": "20260723T000000Z",
			key: "uploads/abc",
			Policy: "policy-base64",
			"X-Amz-Signature": "sig",
		},
		file_id: "file-123",
		...overrides,
	};
}

function makeFile() {
	return new File(["hello world"], "avatar.png", { type: "image/png" });
}

describe("FileAPI.confirmUpload", () => {
	it("posts the multipart form (fields + file) to the BFF upload endpoint", async () => {
		const client = createClient();
		client.get.mockResolvedValue(uploadUrlResponse());

		const api = new FileAPI(client as unknown as HttpClient);
		await api.confirmUpload(makeFile());

		// Step 2: the form is uploaded to /file/v1/upload/{file_id}.
		const uploadCall = client.post.mock.calls.find(
			([path]) => String(path).startsWith("/file/v1/upload/"),
		);
		expect(uploadCall).toBeDefined();
		expect(uploadCall?.[0]).toBe("/file/v1/upload/file-123");

		const form = uploadCall?.[1] as FormData;
		expect(form).toBeInstanceOf(FormData);
		expect(form.get("key")).toBe("uploads/abc");
		expect(form.get("X-Amz-Signature")).toBe("sig");
		expect(form.get("Policy")).toBe("policy-base64");
		expect(form.get("file")).toBeInstanceOf(File);
	});

	it("confirms the upload against the BFF and returns the file id", async () => {
		const client = createClient();
		client.get.mockResolvedValue(uploadUrlResponse());

		const api = new FileAPI(client as unknown as HttpClient);
		const fileId = await api.confirmUpload(makeFile());

		expect(fileId).toBe("file-123");
		expect(client.post).toHaveBeenCalledWith("/file/v1/confirm-upload", {
			id: "file-123",
		});
	});

	it("throws before attempting the upload when file_id is missing", async () => {
		const client = createClient();
		client.get.mockResolvedValue(
			uploadUrlResponse({ file_id: undefined, fileId: undefined }),
		);

		const api = new FileAPI(client as unknown as HttpClient);

		await expect(api.confirmUpload(makeFile())).rejects.toBeInstanceOf(
			ServerError,
		);

		// No upload/confirm request should be made with an undefined id.
		expect(client.post).not.toHaveBeenCalled();
	});

	// --- Bug #3 --------------------------------------------------------------
	it("puts the human message in `.message`, not in `.path` (Bug #3)", async () => {
		const client = createClient();
		client.get.mockResolvedValue(
			uploadUrlResponse({ file_id: undefined, fileId: undefined }),
		);

		const api = new FileAPI(client as unknown as HttpClient);

		const error = await api
			.confirmUpload(makeFile())
			.then(() => {
				throw new Error("expected confirmUpload to reject");
			})
			.catch((e: unknown) => e as ServerError);

		expect(error).toBeInstanceOf(ServerError);
		// The message must be readable...
		expect(error.message).toContain(UPLOAD_HUMAN_MESSAGE);
		// ...and it must NOT have been smuggled into the `path` field.
		expect(error.path).not.toBe(UPLOAD_HUMAN_MESSAGE);
	});
});
