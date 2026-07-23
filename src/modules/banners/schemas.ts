import { z } from "zod";

const ImageSchema = z.object({
	sm: z.url(),
	md: z.url(),
	lg: z.url(),
	xl: z.url(),
});

export const BannerSchema = z.object({
	id: z.uuidv7(),
	name: z.string(),
	url: z.url(),
	images: ImageSchema,
});

export const BannersResponseSchema = z.object({
	items: z.array(BannerSchema),
});

export enum BannerFormat {
	webp = "webp",
	jpeg = "jpeg",
}
