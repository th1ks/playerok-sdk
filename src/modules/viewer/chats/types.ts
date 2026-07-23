import type { z } from "zod";

import type {
  ViewerChatsByTypeResponseSchema,
  ViewerUnreadChatsCounterResponseSchema,
} from "./schemas.js";

export type ViewerUnreadChatsCounterResponse = z.infer<
  typeof ViewerUnreadChatsCounterResponseSchema
>;

export type ViewerChatsByTypeResponse = z.infer<typeof ViewerChatsByTypeResponseSchema>;

export enum ChatType {
  SYSTEM = "SYSTEM",
  SUPPORT = "SUPPORT",
}
