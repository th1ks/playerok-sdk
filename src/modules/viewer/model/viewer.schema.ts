import { z } from "zod";
import { ProfileSchema } from "./profile.schema.js";
import { RoleSchema } from "./role.schema.js";

export const ViewerSchema = z.object({
  id: z.string(), // Айди пользователя
  role: RoleSchema, // Роль пользователя
  profile: ProfileSchema, // Компактный профиль
  createdAt: z.string(), // Дата создания юзера
  username: z.string().nullable(), // Имя пользователя
  email: z.string().nullable(), // Почта юзера
  isBlocked: z.boolean(), // Заблокирован ли пользователь
  isBlockedFor: z.string().nullable(), // Причина блокировки
  isFundsProtectionActive: z.boolean(), // Включена ли защита средств
  hasFrozenBalance: z.boolean(), // Заморожен ли баланс
  hasConfirmedPhoneNumber: z.boolean(), // Подтвержден ли номер
  canPublishItems: z.boolean(), // Доступна ли публикация предметов
  lastItemCreatedAt: z.string().nullable(), // Дата создания последнего предмета
  unreadChatsCounter: z.number(), // Количество непрочитанных чатов
  supportChatId: z.string().nullable(), // Айди чата поддержки
  systemChatId: z.string().nullable(), // Айди системного чата
});
