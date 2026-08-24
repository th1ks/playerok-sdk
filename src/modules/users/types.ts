import type { Avatar, Role } from "../viewer/model/types.js";

/** Публичные данные пользователя, возвращаемые поиском по username. */
export interface GetUserByUsernameResponse {
  /** Идентификатор пользователя. */
  id: string;

  /** Имя пользователя либо `null`, если оно ещё не установлено. */
  username: string | null;

  /** Роль пользователя на платформе. */
  role: Role;

  /** Заблокирован ли пользователь. */
  isBlocked: boolean;

  /** URL основного изображения аватара. */
  avatarURL: string | null;

  /** Набор URL аватара разных размеров. */
  avatar: Avatar | null;

  /** Рейтинг пользователя. */
  rating: number;

  /** Количество отзывов о пользователе. */
  testimonialCounter: number;

  /** Дата создания пользователя в формате, возвращённом API. */
  createdAt: string;
}
