import { z } from "zod";
import type {
  NotificationProvider,
  ViewerNotification,
  ViewerNotifications,
} from "./types.js";

export const NotificationProviderSchema = z.string() satisfies z.ZodType<NotificationProvider>;

export const ViewerNotificationSchema = z.object({
  name: z.string(),
  description: z.string(),
  enabled: z.boolean(),
  disabled: z.boolean(),
  disabledFor: z.string().nullable(),
  id: NotificationProviderSchema,
  props: z.record(z.string(), z.unknown()).nullable(),
}) satisfies z.ZodType<ViewerNotification>;

export const ViewerNotificationsSchema = z.array(
  ViewerNotificationSchema,
) satisfies z.ZodType<ViewerNotifications>;
