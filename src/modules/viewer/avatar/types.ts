import { z } from "zod";

import {
  ViewerAvatarRequestSchema,
  ViewerAvatarResponseSchema,
} from "./schemas.js";

export type ViewerAvatarRequest = z.infer<typeof ViewerAvatarRequestSchema>;

export type ViewerAvatarResponse = z.infer<typeof ViewerAvatarResponseSchema>;
