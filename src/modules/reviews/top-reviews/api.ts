import type { HttpClient } from "../../../http";
import { isUUID } from "../../../util";
import { ValidationError } from "../../../error";
import { TopReviewsResponseSchema } from "./schemas";
import type { TopReviewsResponse } from "./types";

/**
 * Класс получения топа отзывов
 */
export class TopReviewsAPI {
  constructor(private client: HttpClient) { }

  async get(first = 10, after?: string): Promise<TopReviewsResponse> {
    if (after && !isUUID(after)) {
      throw new ValidationError(after, "Поле after должно быть в UUID формате!")
    }

    if (!Number.isInteger(first) || first <= 0) {
      throw new ValidationError(String(first), "Поле first должно быть положительным числом!")
    }

    const url = after ?
      `https://playerok.com/rest-api/public/top-reviews?pagination[first]=${first}&pagination[after]=${after}` :
      `https://playerok.com/rest-api/public/top-reviews?pagination[first]=${first}`

    const r = await this.client.get(url)
    return TopReviewsResponseSchema.parse(r)
  }
}
