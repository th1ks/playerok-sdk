import type { z } from "zod";

import type {
  ViewerChatsByTypeResponseSchema,
  ViewerUnreadChatsCounterResponseSchema,
} from "./schemas.js";

/** Ответ со счётчиком непрочитанных чатов. */
export type ViewerUnreadChatsCounterResponse = z.infer<
  typeof ViewerUnreadChatsCounterResponseSchema
>;

/** Ответ endpoint чатов указанного типа. */
export type ViewerChatsByTypeResponse = z.infer<typeof ViewerChatsByTypeResponseSchema>;

/** Поддерживаемые системные чаты Playerok. */
export enum ChatType {
  SYSTEM = "SYSTEM",
  SUPPORT = "SUPPORT",
}
