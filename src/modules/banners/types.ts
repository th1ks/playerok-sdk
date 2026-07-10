import { z } from "zod";
import type { BannerSchema, BannersResponseSchema } from "./schemas.js";

export type PromoBannersResponse = z.infer<typeof BannersResponseSchema>;
