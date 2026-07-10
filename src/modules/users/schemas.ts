import { z } from "zod";
import { boolean, string } from "zod/v3";
import { RoleSchema } from "../viewer/model/role.schema.js";
import { AvatarSchema } from "../viewer/model/avatar.schema.js";

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
