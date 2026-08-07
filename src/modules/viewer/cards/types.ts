import type { z } from "zod";
import {ChoosenCardResonseSchmea} from "./schemas"

export type ChoosenCardResonse = z.infer<typeof ChoosenCardResonseSchmea>
