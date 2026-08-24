import type z from "zod";
import type { TopReviewsResponseSchema } from "./schemas";

export type TopReviewsResponse = z.infer<typeof TopReviewsResponseSchema>
