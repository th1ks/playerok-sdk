import { z } from "zod";

import {
  NotificationProviderSchema,
  ViewerNotificationSchema,
  ViewerNotificationsSchema,
} from "./schemas.js";

export type NotificationProvider = z.infer<typeof NotificationProviderSchema>;

export type ViewerNotification = z.infer<typeof ViewerNotificationSchema>;

export type ViewerNotifications = z.infer<typeof ViewerNotificationsSchema>;
