import type { z } from "zod";
import type { GetUserByUsernameResponseSchema } from "./schemas.js";

export type GetUserByUsernameResponse = z.infer<typeof GetUserByUsernameResponseSchema>;
