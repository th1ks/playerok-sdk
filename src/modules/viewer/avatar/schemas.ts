import { z } from "zod";

import { AvatarSchema } from "../model/avatar.schema.js";
import type { ViewerAvatarRequest, ViewerAvatarResponse } from "./types.js";

export const ViewerAvatarRequestSchema = z.object({
  avatarId: z.uuidv7(),
}) satisfies z.ZodType<ViewerAvatarRequest>;

export const ViewerAvatarResponseSchema = z.object({
  avatarURL: z.string(),
  avatar: AvatarSchema,
}) satisfies z.ZodType<ViewerAvatarResponse>;
