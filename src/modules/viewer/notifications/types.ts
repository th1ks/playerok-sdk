/** Идентификатор провайдера уведомлений. */
export type NotificationProvider = string;

/** Состояние одного провайдера уведомлений. */
export interface ViewerNotification {
  /** Название провайдера уведомлений. */
  name: string;

  /** Описание провайдера уведомлений. */
  description: string;

  /** Включён ли провайдер пользователем. */
  enabled: boolean;

  /** Недоступен ли провайдер. */
  disabled: boolean;

  /** Причина недоступности провайдера. */
  disabledFor: string | null;

  /** Идентификатор провайдера. */
  id: NotificationProvider;

  /** Дополнительные свойства провайдера. */
  props: Record<string, unknown> | null;
}

/** Список настроек уведомлений. */
export type ViewerNotifications = ViewerNotification[];
