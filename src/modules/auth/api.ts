import type { HttpClient } from "../../http.js";
import {
  ConfirmOtpRequestSchema,
  ConfirmOtpResponseSchema,
  SendOtpRequestSchema,
} from "./schemas.js";

import type { ConfirmOtpResponse } from "./types.js";

export class AuthAPI {
  constructor(private client: HttpClient) {}

  async sendOTP(email: string): Promise<void> {
    const body = SendOtpRequestSchema.parse({
      email,
    });

    await this.client.post("/auth/send-otp", body);
  }

  async confirmOTP(
    email: string,
    otpCode: string,
  ): Promise<ConfirmOtpResponse> {
    const body = ConfirmOtpRequestSchema.parse({
      email,
      otpCode,
    });

    const response = await this.client.post("/auth/confirm-otp", body);

    return ConfirmOtpResponseSchema.parse(response);
  }
}
