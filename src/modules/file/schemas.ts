import { z } from "zod";

export const UploadFieldsSchema = z.object({
  bucket: z.string(),
  "X-Amz-Algorithm": z.string(),
  "X-Amz-Credential": z.string(),
  "X-Amz-Date": z.string(),
  key: z.string(),
  Policy: z.string(),
  "X-Amz-Signature": z.string(),
});

export const UploadUrlSchema = z
  .object({
    url: z.string(),
    fields: UploadFieldsSchema,
    file_id: z.string().optional(),
    fileId: z.string().optional(),
  })
  .transform((data) => ({
    url: data.url.startsWith("http") ? data.url : `https://${data.url}`,
    fields: data.fields,
    file_id: data.file_id ?? data.fileId!,
  }));

export const ConfirmUploadFileRequestSchema = z.object({
  id: z.string(),
});
