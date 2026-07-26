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

export class ViewerAPI {
  constructor(private client: HttpClient) {}

  async get(): Promise<Viewer> {
    const request = await this.client.get("/viewer");

    return ViewerSchema.parse(request);
  }

  async getNotifications(): Promise<ViewerNotification[]> {
    const data = await this.client.get("/viewer/notifications");

    return ViewerNotificationsSchema.parse(data);
  }

  async updateAvatar(fileId: string): Promise<ViewerAvatarResponse> {
    const body = ViewerAvatarRequestSchema.parse({ avatarId: fileId });

    const r = await this.client.put("/viewer/avatar", body);

    return ViewerAvatarResponseSchema.parse(r);
  }

  async getUnreadChatsCounter(): Promise<ViewerUnreadChatsCounterResponse> {
    const r = await this.client.get("/viewer/chats/unread-count");

    return ViewerUnreadChatsCounterResponseSchema.parse(r);
  }

  async getChatsByType(type: ChatType): Promise<ViewerChatsByTypeResponse> {
    const r = await this.client.get(`/viewer/chats?type=${type}`);

    return ViewerChatsByTypeResponseSchema.parse(r);
  }
}
