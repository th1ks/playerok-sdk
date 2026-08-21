import type z from "zod";
import type { UsernameAvailabilitySchema } from "./schema";

export type UsernameAvailabilityResponse = z.infer<typeof UsernameAvailabilitySchema>
