import type { z } from "zod";
import type {
  ConfirmUploadFileRequestSchema,
  UploadFieldsSchema,
  UploadUrlSchema,
} from "./schemas.js";

/** Поля multipart-формы, выданные upload endpoint. */
export type UploadFields = z.infer<typeof UploadFieldsSchema>;
/** Нормализованный ответ endpoint получения URL загрузки. */
export type UploadFileResponse = z.infer<typeof UploadUrlSchema>;
/** Тело запроса подтверждения загрузки. */
export type ConfirmUploadFileRequest = z.infer<typeof ConfirmUploadFileRequestSchema>;

/** Дополнительные параметры загрузки файла. */
export interface ConfirmUploadOptions {
  /**
   * Requests Playerok's avatar-specific upload flow. This preserves the
   * original GIF in avatar storage instead of converting it during upload.
   */
  fileType?: "avatar";
}
