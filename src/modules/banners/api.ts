import type { HttpClient } from "../../http.js";
import {
  BannerSchema,
  BannersResponseSchema,
  BannerFormat,
} from "./schemas.js";
import type { PromoBannersResponse } from "./types.js";

export class BannerAPI {
  constructor(private client: HttpClient) {}

  async getPromoBanners(format: BannerFormat): Promise<PromoBannersResponse> {
    const r = await this.client.get(`/promo-banners?format=${format}`);

    return BannersResponseSchema.parse(r);
  }
}
