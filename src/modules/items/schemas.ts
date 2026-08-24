import { z } from "zod";
import type { ItemPauseResponse } from "./types.js";

export const ItemPauseResponseSchema = z.object({
  success: z.boolean(),
  status: z.string().optional(),
  pauseAvailable: z.boolean().optional(),
  republishAvailable: z.boolean().optional(),
  mayBePublished: z.boolean().optional(),
}) satisfies z.ZodType<ItemPauseResponse>;
