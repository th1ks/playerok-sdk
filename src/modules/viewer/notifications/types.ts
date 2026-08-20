import type { z } from "zod";

import type {
  NotificationProviderSchema,
  ViewerNotificationSchema,
  ViewerNotificationsSchema,
} from "./schemas.js";

/** Идентификатор провайдера уведомлений. */
export type NotificationProvider = z.infer<typeof NotificationProviderSchema>;

/** Состояние одного провайдера уведомлений. */
export type ViewerNotification = z.infer<typeof ViewerNotificationSchema>;

/** Список настроек уведомлений. */
export type ViewerNotifications = z.infer<typeof ViewerNotificationsSchema>;
