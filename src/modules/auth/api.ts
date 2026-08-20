import type { HttpClient } from "../../http.js";
import {
  ConfirmOtpRequestSchema,
  ConfirmOtpResponseSchema,
  SendOtpRequestSchema,
} from "./schemas.js";

import type { ConfirmOtpResponse } from "./types.js";

/**
 * Методы авторизации пользователя.
 *
 * Экземпляр этого класса доступен через `client.auth`.
 * После успешного `confirmOTP` HTTP-клиент сохраняет cookie из `Set-Cookie`
 * и использует её в следующих запросах.
 */
export class AuthAPI {
  constructor(private client: HttpClient) {}

  /**
   * Отправляет одноразовый код на почту аккаунта.
   *
   * @param email Почта аккаунта Playerok.
   * @throws {ZodError} Если email имеет некорректный формат.
   * @throws {RateLimitError} Если превышен лимит запросов.
   *
   * @example
   * ```ts
   * await client.auth.sendOTP("user@example.com");
   * ```
   */
  async sendOTP(email: string): Promise<void> {
    const body = SendOtpRequestSchema.parse({
      email,
    });

    await this.client.post("/auth/send-otp", body);
  }

  /**
   * Подтверждает одноразовый код и завершает вход.
   *
   * @param email Почта, на которую был отправлен код.
   * @param otpCode Шестизначный код из письма.
   * @returns Результат входа и данные сессии второго фактора, если она нужна.
   * @throws {ZodError} Если email некорректен или код не состоит из 6 цифр.
   * @throws {UnauthorizedError} Если код неверный или истёк.
   * @throws {RateLimitError} Если превышен лимит попыток.
   *
   * @example
   * ```ts
   * const result = await client.auth.confirmOTP(
   *   "user@example.com",
   *   "123456",
   * );
   * console.log(result.requiresTwoFactor);
   * ```
   */
  async confirmOTP(email: string, otpCode: string): Promise<ConfirmOtpResponse> {
    const body = ConfirmOtpRequestSchema.parse({
      email,
      otpCode,
    });

    const response = await this.client.post("/auth/confirm-otp", body);

    return ConfirmOtpResponseSchema.parse(response);
  }
}
