import type { Role } from "../../viewer/model/types.js";

/** Пользователь, связанный с отзывом. */
export interface ReviewUser {
  /** Идентификатор пользователя. */
  id: string;

  /** Заблокирован ли пользователь. */
  isBlocked: boolean;

  /** Роль пользователя на платформе. */
  role: Role;

  /** Имя пользователя. */
  username: string;

  /** Рейтинг пользователя. */
  rating: number;

  /** Дата создания пользователя в формате, возвращённом API. */
  createdAt: string;

  /** Количество отзывов о пользователе. */
  testimonialCounter: number;

  /** Есть ли у пользователя VIP-статус. */
  isVip: boolean | null;

  /** URL аватара пользователя. */
  avatarURL: string | null;
}

/** Купленный предмет, к которому относится отзыв. */
export interface ReviewDealItem {
  /** Идентификатор предмета. */
  id: string;

  /** Цена предмета с учётом скидки. */
  rawPrice: number;

  /** Цена предмета без учёта скидки. */
  price: number;

  /** Человекочитаемый идентификатор предмета в URL. */
  slug: string;

  /** Название предмета. */
  name: string;

  /** URL первого изображения предмета. */
  attachmentUrl: string;
}

/** Сделка, в рамках которой был оставлен отзыв. */
export interface ReviewDeal {
  /** Идентификатор сделки. */
  id: string;

  /** Купленный предмет. */
  item: ReviewDealItem;
}

/** Информация о GraphQL-пагинации списка отзывов. */
export interface ReviewPageInfo {
  /** Существует ли предыдущая страница. */
  hasPreviousPage: boolean;

  /** Существует ли следующая страница. */
  hasNextPage: boolean;

  /** Курсор первого элемента текущей страницы. */
  startCursor: string | null;

  /** Курсор последнего элемента текущей страницы. */
  endCursor: string | null;
}

/** Отзыв о завершённой сделке. */
export interface ReviewItem {
  /** Идентификатор отзыва. */
  id: string;

  /** Текст отзыва. */
  text: string | null;

  /** Оценка в отзыве. */
  rating: number;

  /** Статус отзыва. */
  status: string;

  /** Дата создания отзыва. */
  createdAt: string;

  /** Дата последнего изменения отзыва. */
  updatedAt: string;

  /** Пользователь, о котором оставлен отзыв. */
  user: ReviewUser;

  /** Пользователь, создавший отзыв. */
  creator: ReviewUser;

  /** Сделка, к которой относится отзыв. */
  deal: ReviewDeal;
}

/** Ответ endpoint топа отзывов. */
export interface TopReviewsResponse {
  /** Отзывы текущей страницы. */
  items: ReviewItem[];

  /** Информация для курсорной пагинации. */
  pageInfo: ReviewPageInfo;
}
