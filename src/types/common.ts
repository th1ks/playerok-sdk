import { z } from "zod";

export const HttpMethodSchema = z.enum([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
]);

export type HttpMethod = z.infer<typeof HttpMethodSchema>;

export const ApiErrorSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
});

export type ApiErrorResponse = z.infer<typeof ApiErrorSchema>;
