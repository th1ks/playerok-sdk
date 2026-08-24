import { z } from "zod";
import type { Role } from "./types.js";

export const RoleSchema = z.enum([
  "USER",
  "ACCOUNTANT",
  "ADMIN",
  "ADV_DIRECTOR",
  "ADV_MANAGER",
  "CHECKER",
  "DEVELOPER",
  "GAMES_AND_APPS",
  "MODERATOR",
  "MONITORING",
  "OFFICIAL_SELLER",
  "OFFICIAL_SELLER_ADMIN",
  "POSTMODERATOR",
  "POSTSECURITY",
  "SECURITY",
  "SUPPORT",
  "SYSTEM_SELLER",
]) satisfies z.ZodType<Role>;
