import type { z } from "zod";
import type {ChoosenCardResonseSchmea} from "./schemas"

export type ChoosenCardResonse = z.infer<typeof ChoosenCardResonseSchmea>
