import { z } from "zod";

const ImageSchema = z.object({
  sm: z.url(),
  md: z.url(),
  lg: z.url(),
  xl: z.url(),
});

export const BannerSchema = z.object({
  id: z.uuidv7(), // Айди баннера
  name: z.string(), // Имя баннера
  url: z.url(), // Редредикт ссылка с баннера
  images: ImageSchema, // Разновидности изображений баннера
});

export const BannersResponseSchema = z.object({
  items: z.array(BannerSchema),
});

/** Формат изображений, который нужно вернуть в баннерах. */
export enum BannerFormat {
  webp = "webp",
  jpeg = "jpeg",
}
