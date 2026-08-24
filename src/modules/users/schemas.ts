import { z } from "zod";
import { AvatarSchema } from "../viewer/model/avatar.schema.js";
import { RoleSchema } from "../viewer/model/role.schema.js";

export const GetUserByUsernameResponseSchema = z.object({
  id: z.string(), // Айди юзера
  username: z.string().nullable(), // Имя пользователя
  role: RoleSchema, // Роль пользователя
  isBlocked: z.boolean(), // Заблокирован ли пользователь?
  avatarURL: z.string().nullable(), // Ссылка на обычную аву
  avatar: AvatarSchema.nullable(), // Разные размеры аватарки
  rating: z.number(), // Рейтинг пользователя
  testimonialCounter: z.number(), // Количество отзывов пользователя
  createdAt: z.string(), // Дата создания пользователя
});
