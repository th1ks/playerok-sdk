import { z } from "zod";
import { AvatarSchema } from "./avatar.schema.js";

export const ProfileSchema = z.object({
  id: z.string(), // Айди юзера
  avatarURL: z.string().nullable(), // Ссылка на аватарку
  avatar: AvatarSchema.nullable(), // Разные размеры аватарок
  testimonialCounter: z.number(), // reviews count
});
