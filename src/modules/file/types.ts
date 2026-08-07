import type { z } from "zod";
import type {
  ConfirmUploadFileRequestSchema,
  UploadFieldsSchema,
  UploadUrlSchema,
} from "./schemas.js";

export type UploadFields = z.infer<typeof UploadFieldsSchema>;
export type UploadFileResponse = z.infer<typeof UploadUrlSchema>;
export type ConfirmUploadFileRequest = z.infer<typeof ConfirmUploadFileRequestSchema>;

export interface ConfirmUploadOptions {
  /**
   * Requests Playerok's avatar-specific upload flow. This preserves the
   * original GIF in avatar storage instead of converting it during upload.
   */
  fileType?: "avatar";
}
