import z, { boolean, string } from "zod";

export const ItemPauseResponseSchema = z.object({
  success: boolean(),
  status: string().optional(),
  pauseAvailable: boolean().optional(),
  republishAvailable: boolean().optional(),
  mayBePublished: boolean().optional()
})
