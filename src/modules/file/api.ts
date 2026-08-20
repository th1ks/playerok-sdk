import { UnexpectedResponseError } from "../../error.js";
import type { HttpClient } from "../../http.js";
import { ConfirmUploadFileRequestSchema, UploadUrlSchema } from "./schemas.js";
import type { ConfirmUploadOptions, UploadFileResponse } from "./types.js";

/**
 * Методы загрузки файлов в Playerok.
 *
 * Модуль получает upload-параметры, отправляет `FormData`, а затем подтверждает
 * загрузку через Playerok API.
 */
export class FileAPI {
  constructor(private client: HttpClient) {}

  private async getUploadUrl(options?: ConfirmUploadOptions): Promise<UploadFileResponse> {
    const query = options?.fileType ? `?file_type=${encodeURIComponent(options.fileType)}` : "";
    const r = await this.client.get(`/file/v1/upload-url${query}`);

    return UploadUrlSchema.parse(r);
  }

  private async upload(file: File, options?: ConfirmUploadOptions): Promise<string> {
    const upload = await this.getUploadUrl(options);

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

  /**
   * Загружает файл и подтверждает загрузку.
   *
   * @param file Файл, поддерживаемый глобальным `FormData` текущей среды.
   * @param options Дополнительные параметры загрузки.
   * @returns ID загруженного файла.
   * @throws {UnexpectedResponseError} Если API не вернул `file_id`.
   *
   * @example
   * ```ts
   * const fileId = await client.file.confirmUpload(file);
   * ```
   */
  async confirmUpload(file: File, options?: ConfirmUploadOptions): Promise<string> {
    const fileId = await this.upload(file, options);
    const body = ConfirmUploadFileRequestSchema.parse({ id: fileId });

    await this.client.post("/file/v1/confirm-upload", body);
    return fileId;
  }

  /**
   * Загружает файл через avatar-режим, сохраняющий исходный GIF.
   *
   * @param file Файл аватара.
   * @returns ID загруженного avatar-файла.
   */
  async confirmAvatarUpload(file: File): Promise<string> {
    return this.confirmUpload(file, { fileType: "avatar" });
  }
}
