import z from "zod";

export const UsernameAvailabilityResponseSchema = z.object({
  isTaken: z.boolean()
})

export const RegisterViewerRequestSchema = z.object({
  username: z.string()
})
