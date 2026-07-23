import type { z } from "zod";
import type { AvatarSchema } from "./avatar.schema.js";
import type { ProfileSchema } from "./profile.schema.js";
import type { RoleSchema } from "./role.schema.js";
import type { ViewerSchema } from "./viewer.schema.js";

export type Role = z.infer<typeof RoleSchema>;

export type Avatar = z.infer<typeof AvatarSchema>;

export type Profile = z.infer<typeof ProfileSchema>;

export type Viewer = z.infer<typeof ViewerSchema>;
