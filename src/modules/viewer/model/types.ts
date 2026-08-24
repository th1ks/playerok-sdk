/**
 * Роль пользователя в Playerok.
 *
 * - `USER` — обычный пользователь платформы.
 * - `ACCOUNTANT` — финансы и бухгалтерский учёт.
 * - `ADMIN` — администрирование платформы.
 * - `ADV_DIRECTOR` — управление рекламным направлением.
 * - `ADV_MANAGER` — работа с рекламными размещениями.
 * - `CHECKER` — проверка и контроль товаров.
 * - `DEVELOPER` — разработка и техническое обслуживание.
 * - `GAMES_AND_APPS` — управление каталогом игр и приложений.
 * - `MODERATOR` — модерация пользователей и материалов.
 * - `MONITORING` — контроль состояния и доступности товаров.
 * - `OFFICIAL_SELLER` — представитель официального продавца.
 * - `OFFICIAL_SELLER_ADMIN` — администратор официального продавца.
 * - `POSTMODERATOR` — модерация публикаций и контента.
 * - `POSTSECURITY` — контроль безопасности публикаций.
 * - `SECURITY` — безопасность и контроль нарушений.
 * - `SUPPORT` — поддержка пользователей.
 * - `SYSTEM_SELLER` — системная роль продавца.
 */
export type Role =
  | "USER"
  | "ACCOUNTANT"
  | "ADMIN"
  | "ADV_DIRECTOR"
  | "ADV_MANAGER"
  | "CHECKER"
  | "DEVELOPER"
  | "GAMES_AND_APPS"
  | "MODERATOR"
  | "MONITORING"
  | "OFFICIAL_SELLER"
  | "OFFICIAL_SELLER_ADMIN"
  | "POSTMODERATOR"
  | "POSTSECURITY"
  | "SECURITY"
  | "SUPPORT"
  | "SYSTEM_SELLER";

/** Набор URL аватара разных размеров. */
export interface Avatar {
  /** URL изображения размера XS. */
  XS: string;

  /** URL изображения размера S. */
  S: string;

  /** URL изображения размера M. */
  M: string;

  /** URL изображения исходного или стандартного размера. */
  default: string;
}

/** Публичная часть профиля пользователя. */
export interface Profile {
  /** Идентификатор профиля. */
  id: string;

  /** URL основного изображения аватара. */
  avatarURL: string | null;

  /** Набор URL аватара разных размеров. */
  avatar: Avatar | null;

  /** Количество отзывов о пользователе. */
  testimonialCounter: number;
}

/** Полная модель текущего пользователя. */
export interface Viewer {
  /** Идентификатор пользователя. */
  id: string;

  /** Роль пользователя на платформе. */
  role: Role;

  /** Компактный публичный профиль пользователя. */
  profile: Profile;

  /** Дата создания пользователя в формате, возвращённом API. */
  createdAt: string;

  /** Имя пользователя либо `null`, если оно ещё не установлено. */
  username: string | null;

  /** Почта пользователя либо `null`, если она недоступна. */
  email: string | null;

  /** Заблокирован ли пользователь. */
  isBlocked: boolean;

  /** Причина блокировки пользователя. */
  isBlockedFor: string | null;

  /** Включена ли защита средств. */
  isFundsProtectionActive: boolean;

  /** Есть ли у пользователя замороженный баланс. */
  hasFrozenBalance: boolean;

  /** Подтверждён ли номер телефона. */
  hasConfirmedPhoneNumber: boolean;

  /** Может ли пользователь публиковать товары. */
  canPublishItems: boolean;

  /** Дата создания последнего товара. */
  lastItemCreatedAt: string | null;

  /** Количество непрочитанных чатов. */
  unreadChatsCounter: number;

  /** Идентификатор чата поддержки. */
  supportChatId: string | null;

  /** Идентификатор системного чата. */
  systemChatId: string | null;
}
