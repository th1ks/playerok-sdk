import { z } from "zod";
import { AvatarSchema } from "./avatar.schema.js";

export const ProfileSchema = z.object({
  id: z.string(),

  avatarURL: z.string().nullable(),

  avatar: AvatarSchema.nullable(),

  testimonialCounter: z.number(),
});
