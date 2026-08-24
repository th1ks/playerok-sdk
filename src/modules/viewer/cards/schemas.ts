import { z } from "zod";
import type { ChoosenCardResponse } from "./types.js";

export const ChoosenCardResponseSchmea = z.object({
  id: z.string(),
  cardFirstSix: z.string(),
  cardLastFour: z.string(),
  cardType: z.string(),
  isChosen: z.boolean(),
}) satisfies z.ZodType<ChoosenCardResponse>;
