/** Данные для отправки одноразового кода. */
export interface SendOtpRequest {
  /** Почта аккаунта Playerok, на которую нужно отправить код. */
  email: string;
}

/** Данные для подтверждения одноразового кода. */
export interface ConfirmOtpRequest {
  /** Почта аккаунта, на которую был отправлен код. */
  email: string;

  /** Шестизначный одноразовый код из письма. */
  otpCode: string;
}

/** Данные сессии для прохождения второго фактора. */
export interface SecondFactorSession {
  /** Токен сессии второго фактора. */
  token: string;

  /** Дата и время истечения сессии в формате, возвращённом API. */
  expiresAt: string;
}

/** Ответ подтверждения OTP и состояние второго фактора. */
export interface ConfirmOtpResponse {
  /** Требуется ли пользователю пройти второй фактор. */
  requiresTwoFactor: boolean;

  /** Сессия второго фактора, если дополнительная проверка необходима. */
  secondFactorSession?: SecondFactorSession | null | undefined;
}
