import type { HttpClient } from "../../http";
import { ItemPauseResponseSchema } from "./schemas";
import type { ItemPauseResponse } from "./types";

/** Методы управления публикацией товаров пользователя. */
export class ItemsAPI {
  constructor(private client: HttpClient) { }

  /**
   * Останавливает публикацию товара.
   *
   * @param itemId ID товара.
   * @returns Результат операции и доступность дальнейших действий.
   * @throws {NotFoundError} Если товар не найден.
   * @throws {UnauthorizedError} Если токен недействителен.
   */
  public async discontinueItem(itemId: string): Promise<ItemPauseResponse> {
    const rq = await this.client.post(`/item/${itemId}/discontinue`, {})
    return ItemPauseResponseSchema.parse(rq)
  }

  /**
   * Переопубликовывает ранее остановленный товар.
   *
   * @param itemId ID товара.
   * @returns Результат операции и доступность дальнейших действий.
   * @throws {NotFoundError} Если товар не найден.
   * @throws {UnauthorizedError} Если токен недействителен.
   */
  public async republishItem(itemId: string): Promise<ItemPauseResponse> {
    const rq = await this.client.post(`/item/${itemId}/republish`, {})
    return ItemPauseResponseSchema.parse(rq)
  }
}
