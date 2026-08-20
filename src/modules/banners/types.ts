import type { z } from "zod";
import type { BannersResponseSchema } from "./schemas.js";

/** Ответ API со списком промо-баннеров. */
export type PromoBannersResponse = z.infer<typeof BannersResponseSchema>;
