import { ValidationError } from "../../../error.js";
import type { HttpClient } from "../../../http.js";
import { isUUID } from "../../../util.js";
import { TopReviewsResponseSchema } from "./schemas.js";
import type { TopReviewsResponse } from "./types.js";

/** Методы получения топа отзывов Playerok. */
export class TopReviewsAPI {
  constructor(private client: HttpClient) {}

  /**
   * Возвращает страницу топа отзывов.
   *
   * @param first Количество отзывов на странице.
   * @param after Курсор, после которого нужно загрузить следующую страницу.
   * @returns Отзывы и данные курсорной пагинации.
   * @throws {ValidationError} Если `first` не является положительным целым числом.
   * @throws {ValidationError} Если `after` передан не в формате UUID.
   */
  async get(first = 10, after?: string): Promise<TopReviewsResponse> {
    if (after && !isUUID(after)) {
      throw new ValidationError(after, "Поле after должно быть в UUID формате!");
    }

    if (!Number.isInteger(first) || first <= 0) {
      throw new ValidationError(String(first), "Поле first должно быть положительным числом!");
    }

    const url = after
      ? `https://playerok.com/rest-api/public/top-reviews?pagination[first]=${first}&pagination[after]=${after}`
      : `https://playerok.com/rest-api/public/top-reviews?pagination[first]=${first}`;

    const r = await this.client.get(url);
    return TopReviewsResponseSchema.parse(r);
  }
}
