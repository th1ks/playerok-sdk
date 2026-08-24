import { z } from "zod";
import type {
  ViewerChatsByTypeResponse,
  ViewerUnreadChatsCounterResponse,
} from "./types.js";

export const ViewerUnreadChatsCounterResponseSchema = z.object({
  count: z.number(),
}) satisfies z.ZodType<ViewerUnreadChatsCounterResponse>;

export const ViewerChatsByTypeResponseSchema = z.object({
  id: z.string(),
}) satisfies z.ZodType<ViewerChatsByTypeResponse>;
