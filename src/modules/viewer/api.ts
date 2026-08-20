import type { HttpClient } from "../../http.js";
import { ViewerAvatarRequestSchema, ViewerAvatarResponseSchema } from "./avatar/schemas.js";
import type { ViewerAvatarResponse } from "./avatar/types.js";
import type { ChoosenCardResonse } from "./cards/types.js";
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
import { ChoosenCardResonseSchmea } from "./cards/schemas.js";

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
  async getChoosenCard(): Promise<ChoosenCardResonse | null> {
    const r = await this.client.get("/viewer/chosen-card")

    if (r == null) {
      return null
    }

    return ChoosenCardResonseSchmea.parse(r)
  }
}
