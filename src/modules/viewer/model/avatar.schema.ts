import { z } from "zod";

export const AvatarSchema = z.object({
  XS: z.string(),
  S: z.string(),
  M: z.string(),
  default: z.string(),
});
