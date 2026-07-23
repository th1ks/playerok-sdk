import type { z } from "zod";
import type {
  ConfirmOtpRequestSchema,
  ConfirmOtpResponseSchema,
  SendOtpRequestSchema,
} from "./schemas.js";

export type SendOtpRequest = z.infer<typeof SendOtpRequestSchema>;
export type ConfirmOtpRequest = z.infer<typeof ConfirmOtpRequestSchema>;
export type ConfirmOtpResponse = z.infer<typeof ConfirmOtpResponseSchema>;
