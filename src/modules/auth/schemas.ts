import { z } from "zod";

export const SendOtpRequestSchema = z.object({
  email: z.email(),
});

export const ConfirmOtpRequestSchema = z.object({
  email: z.email(),
  otpCode: z
    .string()
    .length(6)
    .regex(/^\d{6}$/),
});

export const ConfirmOtpResponseSchema = z.object({
  requiresTwoFactor: z.boolean(),
  secondFactorSession: z
    .object({
      token: z.string(),
      expiresAt: z.string(),
    })
    .nullable()
    .optional(),
});
