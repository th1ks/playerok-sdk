import type { HttpClient } from "../../http.js";
import { type BannerFormat, BannersResponseSchema } from "./schemas.js";
import type { PromoBannersResponse } from "./types.js";

/** API для получения рекламных баннеров Playerok. */
export class BannerAPI {
  constructor(private client: HttpClient) {}

  /**
   * Возвращает доступные промо-баннеры в указанном формате изображений.
   *
   * @param format Формат изображений: `webp` или `jpeg`.
   * @returns Список баннеров с URL и набором размеров изображений.
   *
   * @example
   * ```ts
   * const banners = await client.banners.getPromoBanners(BannerFormat.webp);
   * ```
   */
  async getPromoBanners(format: BannerFormat): Promise<PromoBannersResponse> {
    const r = await this.client.get(`/promo-banners?format=${format}`);

    return BannersResponseSchema.parse(r);
  }
}
