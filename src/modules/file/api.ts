import { UnexpectedResponseError } from "../../error.js";
import type { HttpClient } from "../../http.js";
import { ConfirmUploadFileRequestSchema, UploadUrlSchema } from "./schemas.js";
import type { UploadFileResponse } from "./types.js";

export class FileAPI {
  constructor(private client: HttpClient) {}

  private async getUploadUrl(): Promise<UploadFileResponse> {
    const r = await this.client.get("/file/v1/upload-url");

    return UploadUrlSchema.parse(r);
  }

  private async upload(file: File): Promise<string> {
    const upload = await this.getUploadUrl();

    const form = new FormData();

    for (const [k, v] of Object.entries(upload.fields)) {
      form.append(k, v);
    }

    form.append("file", file);

    if (!upload.file_id) {
      throw new UnexpectedResponseError(
        "Upload URL response is missing the file_id field",
        "/file/v1/upload-url",
        upload,
      );
    }

    await this.client.post(`/file/v1/upload/${upload.file_id}`, form);

    return upload.file_id;
  }

  async confirmUpload(file: File): Promise<string> {
    const fileId = await this.upload(file);
    const body = ConfirmUploadFileRequestSchema.parse({ id: fileId });

    await this.client.post("/file/v1/confirm-upload", body);
    return fileId;
  }
}
