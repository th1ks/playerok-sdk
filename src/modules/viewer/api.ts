import type { HttpClient } from "../../http.js";
import { ViewerAvatarRequestSchema, ViewerAvatarResponseSchema } from "./avatar/schemas.js";
import type { ViewerAvatarResponse } from "./avatar/types.js";
import {
  ViewerChatsByTypeResponseSchema,
  ViewerUnreadChatsCounterResponseSchema,
} from "./chats/schemas.js";
import type {
  ChatType,
  ViewerChatsByTypeResponse,
  ViewerUnreadChatsCounterResponse,
} from "./chats/types.js";
import type { Viewer } from "./model/types.js";
import { ViewerSchema } from "./model/viewer.schema.js";
import { ViewerNotificationsSchema } from "./notifications/schemas.js";
import type { ViewerNotification } from "./notifications/types.js";
import type { UsernameAvailabilityResponse } from "./registration/types.js";
import { ValidationError } from "../../error.js";
import { RegisterViewerRequestSchema, UsernameAvailabilityResponseSchema } from "./registration/schemas.js";
import { isUsernameValid } from "../../util.js";
import { ChoosenCardResponseSchmea } from "./cards/schemas.js";
import type { ChoosenCardResponse } from "./cards/types.js";

/** Методы текущего авторизованного пользователя Playerok. */
export class ViewerAPI {
  constructor(private client: HttpClient) {}

  /**
   * Возвращает профиль текущего пользователя.
   *
   * @returns Аккаунт, профиль, роль и состояние возможностей пользователя.
   * @throws {UnauthorizedError} Если клиент не авторизован.
   */
  async get(): Promise<Viewer> {
    const request = await this.client.get("/viewer");

    return ViewerSchema.parse(request);
  }

  /** Возвращает настройки и состояние провайдеров уведомлений. */
  async getNotifications(): Promise<ViewerNotification[]> {
    const data = await this.client.get("/viewer/notifications");

    return ViewerNotificationsSchema.parse(data);
  }

  /**
   * Устанавливает ранее загруженный файл как аватар.
   *
   * @param fileId UUID файла из `client.file.confirmAvatarUpload()`.
   * @returns Обновлённые URL и размеры аватара.
   */
  async updateAvatar(fileId: string): Promise<ViewerAvatarResponse> {
    const body = ViewerAvatarRequestSchema.parse({ avatarId: fileId });

    const r = await this.client.put("/viewer/avatar", body);

    return ViewerAvatarResponseSchema.parse(r);
  }

  /** Возвращает количество непрочитанных чатов. */
  async getUnreadChatsCounter(): Promise<ViewerUnreadChatsCounterResponse> {
    const r = await this.client.get("/viewer/chats/unread-count");

    return ViewerUnreadChatsCounterResponseSchema.parse(r);
  }

  /**
   * Возвращает чат указанного системного типа.
   *
   * @param type Тип чата: support или system.
   */
  async getChatsByType(type: ChatType): Promise<ViewerChatsByTypeResponse> {
    const r = await this.client.get(`/viewer/chats?type=${type}`);

    return ViewerChatsByTypeResponseSchema.parse(r);
  }

  /** Возвращает выбранную платёжную карту либо `null`, если карта не выбрана. */
  async getChoosenCard(): Promise<ChoosenCardResponse | null> {
    const r = await this.client.get("/viewer/chosen-card")

    if (r == null) {
      return null
    }

    return ChoosenCardResponseSchmea.parse(r)
  }

  /**
   * Проверяет доступность имени пользователя.
   *
   * @param username Имя пользователя, которое нужно проверить.
   * @returns Результат проверки доступности имени пользователя.
   *
   * @throws {@link ValidationError}
   * Если передано невалидное имя пользователя.
   */
  async checkUsernameAvailability(username: string): Promise<UsernameAvailabilityResponse> {
    if (!isUsernameValid(username)) {
      throw new ValidationError(username, "Имя пользователя должно быть валидным!")
    }

    const r = await this.client.get(`/viewer/username-availability?username=${username}`)
    return UsernameAvailabilityResponseSchema.parse(r)
  }

  /**
   * Завершает регистрацию нового пользователя, устанавливая имя пользователя.
   *
   * @param username Имя пользователя, которое нужно установить
   *
   * @throws {@link ConflictError}
   * Если пользователь уже установил имя пользователя.
   *
   * Известные коды ошибки:
   * - `username_already_set`
   *
   * @returns Профиль пользователя
   */
  async completeRegistration(username: string): Promise<Viewer> {
    if (!isUsernameValid(username)) {
      throw new ValidationError(username, "Имя пользователя должно быть валидным!")
    }

    const body = RegisterViewerRequestSchema.parse({username: username})

    const r = await this.client.post("/viewer/registration", body)

    return ViewerSchema.parse(r)
  }
}
