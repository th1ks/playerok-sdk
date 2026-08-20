import type { z } from "zod";

import type { ViewerAvatarRequestSchema, ViewerAvatarResponseSchema } from "./schemas.js";

/** Тело запроса установки аватара. */
export type ViewerAvatarRequest = z.infer<typeof ViewerAvatarRequestSchema>;

/** Ответ установки аватара. */
export type ViewerAvatarResponse = z.infer<typeof ViewerAvatarResponseSchema>;
