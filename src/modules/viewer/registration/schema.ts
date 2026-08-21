import z from "zod";

export const UsernameAvailabilitySchema = z.object({
  isTaken: z.boolean()
})
