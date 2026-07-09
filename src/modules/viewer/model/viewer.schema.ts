import { z } from "zod";

import { RoleSchema } from "./role.schema.js";
import { ProfileSchema } from "./profile.schema.js";

export const ViewerSchema = z.object({
  id: z.string(),

  role: RoleSchema,

  profile: ProfileSchema,

  createdAt: z.string(),

  username: z.string().nullable(),

  email: z.string().nullable(),

  isBlocked: z.boolean(),

  isBlockedFor: z.string().nullable(),

  isFundsProtectionActive: z.boolean(),

  hasFrozenBalance: z.boolean(),

  hasConfirmedPhoneNumber: z.boolean(),

  canPublishItems: z.boolean(),

  lastItemCreatedAt: z.string().nullable(),

  unreadChatsCounter: z.number(),

  supportChatId: z.string().nullable(),

  systemChatId: z.string().nullable(),
});
