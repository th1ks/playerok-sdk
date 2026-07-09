import { z } from "zod";

import { ViewerUnreadChatsCounterResponseSchema } from "./schemas.js";

export type ViewerUnreadChatsCounterResponse = z.infer<
  typeof ViewerUnreadChatsCounterResponseSchema
>;
