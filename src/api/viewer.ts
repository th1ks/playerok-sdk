import type { HttpClient } from "../http.js";
import {
	ViewerAvatarRequestSchema,
	ViewerAvatarResponseSchema,
} from "../modules/viewer/avatar/schemas.js";
import type { ViewerAvatarResponse } from "../modules/viewer/avatar/types.js";
import {
	ViewerChatsByTypeResponseSchema,
	ViewerUnreadChatsCounterResponseSchema,
} from "../modules/viewer/chats/schemas.js";
import type {
	ChatType,
	ViewerChatsByTypeResponse,
	ViewerUnreadChatsCounterResponse,
} from "../modules/viewer/chats/types.js";
import type { Viewer } from "../modules/viewer/model/types.js";
import { ViewerSchema } from "../modules/viewer/model/viewer.schema.js";
import { ViewerNotificationsSchema } from "../modules/viewer/notifications/schemas.js";
import type { ViewerNotification } from "../modules/viewer/notifications/types.js";

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
