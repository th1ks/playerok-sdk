import { z } from "zod";

import { RoleSchema } from "./role.schema.js";
import { AvatarSchema } from "./avatar.schema.js";
import { ProfileSchema } from "./profile.schema.js";
import { ViewerSchema } from "./viewer.schema.js";

export type Role = z.infer<typeof RoleSchema>;

export type Avatar = z.infer<typeof AvatarSchema>;

export type Profile = z.infer<typeof ProfileSchema>;

export type Viewer = z.infer<typeof ViewerSchema>;
