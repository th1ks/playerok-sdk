import type { z } from "zod";
import type { GetUserByUsernameResponseSchema } from "./schemas.js";

/** Публичные данные пользователя, возвращаемые поиском по username. */
export type GetUserByUsernameResponse = z.infer<typeof GetUserByUsernameResponseSchema>;
