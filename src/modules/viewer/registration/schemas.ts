import { z } from "zod";
import type { RegisterViewerRequest, UsernameAvailabilityResponse } from "./types.js";

export const UsernameAvailabilityResponseSchema = z.object({
  isTaken: z.boolean(),
}) satisfies z.ZodType<UsernameAvailabilityResponse>;

export const RegisterViewerRequestSchema = z.object({
  username: z.string(),
}) satisfies z.ZodType<RegisterViewerRequest>;
