import { z } from "zod";
import type { BannerImages, PromoBanner, PromoBannersResponse } from "./types.js";

const ImageSchema = z.object({
  sm: z.url(),
  md: z.url(),
  lg: z.url(),
  xl: z.url(),
}) satisfies z.ZodType<BannerImages>;

export const BannerSchema = z.object({
  id: z.uuidv7(),
  name: z.string(),
  url: z.url(),
  images: ImageSchema,
}) satisfies z.ZodType<PromoBanner>;

export const BannersResponseSchema = z.object({
  items: z.array(BannerSchema),
}) satisfies z.ZodType<PromoBannersResponse>;

/** Формат изображений, который нужно вернуть в баннерах. */
export enum BannerFormat {
  webp = "webp",
  jpeg = "jpeg",
}
