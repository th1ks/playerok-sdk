import type z from "zod";
import type { ItemPauseResponseSchema } from "./schemas";

/** Ответ остановки или переопубликации товара. */
export type ItemPauseResponse = z.infer<typeof ItemPauseResponseSchema>
