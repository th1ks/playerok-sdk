import { z } from "zod";

export const NotificationProviderSchema = z.string();

export const ViewerNotificationSchema = z.object({
  name: z.string(),

  description: z.string(),

  enabled: z.boolean(),

  disabled: z.boolean(),

  disabledFor: z.string().nullable(),

  id: NotificationProviderSchema,

  props: z.record(z.string(), z.unknown()).nullable(),
});

export const ViewerNotificationsSchema = z.array(ViewerNotificationSchema);
