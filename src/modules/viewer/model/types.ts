import type { z } from "zod";
import type { AvatarSchema } from "./avatar.schema.js";
import type { ProfileSchema } from "./profile.schema.js";
import type { RoleSchema } from "./role.schema.js";
import type { ViewerSchema } from "./viewer.schema.js";

/** Роль пользователя в Playerok. */
export type Role = z.infer<typeof RoleSchema>;

/** Набор URL аватара разных размеров. */
export type Avatar = z.infer<typeof AvatarSchema>;

/** Публичная часть профиля пользователя. */
export type Profile = z.infer<typeof ProfileSchema>;

/** Полная модель текущего пользователя. */
export type Viewer = z.infer<typeof ViewerSchema>;
