import { z } from "zod";

export const ViewerUnreadChatsCounterResponseSchema = z.object({
  count: z.number(),
});
