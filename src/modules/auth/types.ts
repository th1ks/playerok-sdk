import type { z } from "zod";
import type {
  ConfirmOtpRequestSchema,
  ConfirmOtpResponseSchema,
  SendOtpRequestSchema,
} from "./schemas.js";

/** Данные для отправки одноразового кода. */
export type SendOtpRequest = z.infer<typeof SendOtpRequestSchema>;
/** Данные для подтверждения одноразового кода. */
export type ConfirmOtpRequest = z.infer<typeof ConfirmOtpRequestSchema>;
/** Ответ подтверждения OTP и состояние второго фактора. */
export type ConfirmOtpResponse = z.infer<typeof ConfirmOtpResponseSchema>;
