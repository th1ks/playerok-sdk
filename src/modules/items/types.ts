import type z from "zod";
import type { ItemPauseResponseSchema } from "./schemas";

export type ItemPauseResponse = z.infer<typeof ItemPauseResponseSchema>