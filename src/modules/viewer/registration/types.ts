/** Результат проверки доступности имени пользователя. */
export interface UsernameAvailabilityResponse {
  /** Занято ли указанное имя пользователя. */
  isTaken: boolean;
}

/** Тело запроса завершения регистрации пользователя. */
export interface RegisterViewerRequest {
  /** Имя пользователя, которое нужно установить. */
  username: string;
}
