import type { z } from "zod";
import type { BannersResponseSchema } from "./schemas.js";

export type PromoBannersResponse = z.infer<typeof BannersResponseSchema>;
