import { fi, id } from "zod/v4/locales";
import type { HttpClient } from "../http.js";
import {
  ConfirmUploadFileRequestSchema,
  UploadFieldsSchema,
  UploadUrlSchema,
} from "../modules/file/schemas.js";
import type { UploadFileResponse } from "../modules/file/types.js";

export class FileAPI {
  constructor(private client: HttpClient) {}

  private async getUploadUrl(): Promise<UploadFileResponse> {
    const r = await this.client.get("/file/v1/upload-url");

    return UploadUrlSchema.parse(r);
  }

  private async upload(file: File): Promise<string> {
    const upload = await this.getUploadUrl();

    const form = new FormData();

    Object.entries(upload.fields).forEach(([k, v]) => {
      form.append(k, v);
    });

    form.append("file", file);

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
