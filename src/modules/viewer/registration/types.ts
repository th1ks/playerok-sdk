import type z from "zod";
import type { UsernameAvailabilityResponseSchema } from "./schemas";

export type UsernameAvailabilityResponse = z.infer<typeof UsernameAvailabilityResponseSchema>
