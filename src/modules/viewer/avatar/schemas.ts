import { z } from "zod";

import { AvatarSchema } from "../model/avatar.schema.js";

export const ViewerAvatarRequestSchema = z.object({
  avatarId: z.uuidv7(),
});

export const ViewerAvatarResponseSchema = z.object({
  avatarURL: z.string(),

  avatar: AvatarSchema,
});
