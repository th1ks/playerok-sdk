import { z } from "zod";
import { AvatarSchema } from "../viewer/model/avatar.schema.js";
import { RoleSchema } from "../viewer/model/role.schema.js";

export const GetUserByUsernameResponseSchema = z.object({
  id: z.string(),
  username: z.string().nullable(),
  role: RoleSchema,
  isBlocked: z.boolean(),
  avatarURL: z.string(),
  avatar: AvatarSchema.nullable(),
  rating: z.number(),
  testimonialCounter: z.number(),
  createdAt: z.string(),
});
