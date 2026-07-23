import type { z } from "zod";

import type {
  NotificationProviderSchema,
  ViewerNotificationSchema,
  ViewerNotificationsSchema,
} from "./schemas.js";

export type NotificationProvider = z.infer<typeof NotificationProviderSchema>;

export type ViewerNotification = z.infer<typeof ViewerNotificationSchema>;

export type ViewerNotifications = z.infer<typeof ViewerNotificationsSchema>;
