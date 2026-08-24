import { z } from "zod";
import { RoleSchema } from "../../viewer/model/role.schema.js";
import type {
  ReviewDeal as ReviewDealType,
  ReviewDealItem as ReviewDealItemType,
  ReviewItem as ReviewItemType,
  ReviewPageInfo as ReviewPageInfoType,
  ReviewUser as ReviewUserType,
  TopReviewsResponse,
} from "./types.js";

export const ReviewUser = z.object({
  id: z.string(),
  isBlocked: z.boolean(),
  role: RoleSchema,
  username: z.string(),
  rating: z.number(),
  createdAt: z.string(),
  testimonialCounter: z.number(),
  isVip: z.boolean().nullable(),
  avatarURL: z.string().nullable(),
}) satisfies z.ZodType<ReviewUserType>;

export const ReviewDealItem = z.object({
  id: z.string(),
  rawPrice: z.number(),
  price: z.number(),
  slug: z.string(),
  name: z.string(),
  attachmentUrl: z.string(),
}) satisfies z.ZodType<ReviewDealItemType>;

export const ReviewDeal = z.object({
  id: z.string(),
  item: ReviewDealItem,
}) satisfies z.ZodType<ReviewDealType>;

export const ReviewPageInfo = z.object({
  hasPreviousPage: z.boolean(),
  hasNextPage: z.boolean(),
  startCursor: z.string().nullable(),
  endCursor: z.string().nullable(),
}) satisfies z.ZodType<ReviewPageInfoType>;

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
}) satisfies z.ZodType<ReviewItemType>;

export const TopReviewsResponseSchema = z.object({
  items: z.array(ReviewItem),
  pageInfo: ReviewPageInfo,
}) satisfies z.ZodType<TopReviewsResponse>;
