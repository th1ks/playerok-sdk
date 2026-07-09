import { fi } from "zod/v4/locales";
import type { HttpClient } from "../../http.js";
import type { Viewer } from "./model/types.js";
import { ViewerSchema } from "./model/viewer.schema.js";
import { ViewerNotificationsSchema } from "./notifications/schemas.js";
import type { ViewerNotification } from "./notifications/types.js";
import type { ViewerAvatarResponse } from "./avatar/types.js";
import {
  ViewerAvatarRequestSchema,
  ViewerAvatarResponseSchema,
} from "./avatar/schemas.js";
import type { ViewerUnreadChatsCounterResponse } from "./chats/types.js";
import { ViewerUnreadChatsCounterResponseSchema } from "./chats/schemas.js";

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
}
