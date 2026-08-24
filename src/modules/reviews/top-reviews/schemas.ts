import z from "zod";
import { RoleSchema } from "../../viewer/model/role.schema";

/** Создатель отзыва и продавец */
export const ReviewUser = z.object({
  id: z.string(), // Айди пользователя
  isBlocked: z.boolean(), // Заблокирован ли пользователь
  role: RoleSchema, // Роль пользователя
  username: z.string(), // Имя пользователя
  rating: z.number(), // Рейтинг пользователя
  createdAt: z.string(), // Дата создания юзера
  testimonialCounter: z.number(), // Количество отзывов юзера
  isVip: z.boolean().nullable(), // Имеет ли пользователь вип статус?
  avatarURL: z.string().nullable() // Аватарка юзера, может быть null
})

/** Купленный предмет */
export const ReviewDealItem = z.object({
  id: z.string(), // Айди предмета
  rawPrice: z.number(), // Цена с учетом скидки
  price: z.number(), // Цена без учета скидки
  slug: z.string(), // Слаг предмета
  name: z.string(), // Имя предмета
  attachmentUrl: z.string() // Первая картинка предмета
})

/** Review Deal */
export const ReviewDeal = z.object({
  id: z.string(), // Айди сделки
  item: ReviewDealItem // Купленный предмет в сделке
})

/** GraphQl пагинация */
export const ReviewPageInfo = z.object({
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
  startCursor: z.string().nullable(),
  endCursor: z.string().nullable()
})

/** Item Review */
export const ReviewItem = z.object({
  id: z.string(),
  text: z.string().nullable(),
  rating: z.number(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: ReviewUser,
  creator: ReviewUser,
  deal: ReviewDeal,
})

/* Ответ top-reviews */
export const TopReviewsResponseSchema = z.object({
  items: z.array(ReviewItem),
  pageInfo: ReviewPageInfo
})
