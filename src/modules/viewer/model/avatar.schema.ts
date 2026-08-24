import { z } from "zod";
import type { Avatar } from "./types.js";

export const AvatarSchema = z.object({
  XS: z.string(),
  S: z.string(),
  M: z.string(),
  default: z.string(),
}) satisfies z.ZodType<Avatar>;
