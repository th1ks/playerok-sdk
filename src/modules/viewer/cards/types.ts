import type { z } from "zod";
import type {ChoosenCardResponseSchmea} from "./schemas"

/** Маскированные данные выбранной платёжной карты. */
export type ChoosenCardResponse = z.infer<typeof ChoosenCardResponseSchmea>
