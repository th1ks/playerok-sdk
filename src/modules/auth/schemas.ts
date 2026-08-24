import { z } from "zod";
import type {
  ConfirmOtpRequest,
  ConfirmOtpResponse,
  SendOtpRequest,
} from "./types.js";

export const SendOtpRequestSchema = z.object({
  email: z.email(),
}) satisfies z.ZodType<SendOtpRequest>;

export const ConfirmOtpRequestSchema = z.object({
  email: z.email(),
  otpCode: z
    .string()
    .length(6)
    .regex(/^\d{6}$/),
}) satisfies z.ZodType<ConfirmOtpRequest>;

/** Схема ответа подтверждения OTP. */
export const ConfirmOtpResponseSchema = z.object({
  requiresTwoFactor: z.boolean(),
  secondFactorSession: z
    .object({
      token: z.string(),
      expiresAt: z.string(),
    })
    .nullable()
    .optional(),
}) satisfies z.ZodType<ConfirmOtpResponse>;
