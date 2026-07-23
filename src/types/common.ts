import { z } from "zod";

export const HttpMethodSchema = z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]);

export type HttpMethod = z.infer<typeof HttpMethodSchema>;
