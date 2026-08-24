/** Ответ со счётчиком непрочитанных чатов. */
export interface ViewerUnreadChatsCounterResponse {
  /** Количество непрочитанных чатов. */
  count: number;
}

/** Ответ endpoint чатов указанного типа. */
export interface ViewerChatsByTypeResponse {
  /** Идентификатор системного чата. */
  id: string;
}

/** Поддерживаемые системные чаты Playerok. */
export enum ChatType {
  /** Системный чат. */
  SYSTEM = "SYSTEM",

  /** Чат службы поддержки. */
  SUPPORT = "SUPPORT",
}
