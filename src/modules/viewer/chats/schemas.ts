import { z } from "zod";

export const ViewerUnreadChatsCounterResponseSchema = z.object({
	count: z.number(),
});

export const ViewerChatsByTypeResponseSchema = z.object({
	id: z.string(),
});
