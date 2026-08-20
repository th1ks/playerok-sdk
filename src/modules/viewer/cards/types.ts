import type { z } from "zod";
import type {ChoosenCardResonseSchmea} from "./schemas"

/** Маскированные данные выбранной платёжной карты. */
export type ChoosenCardResonse = z.infer<typeof ChoosenCardResonseSchmea>
