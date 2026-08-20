import type { HttpClient } from "../../http";
import { ItemPauseResponseSchema } from "./schemas";
import type { ItemPauseResponse } from "./types";

export class ItemsAPI {
  constructor(private client: HttpClient) { }

  public async discontinueItem(itemId: string): Promise<ItemPauseResponse> {
    const rq = await this.client.post(`/item/${itemId}/discontinue`, {})
    return ItemPauseResponseSchema.parse(rq)
  }

  public async republishItem(itemId: string): Promise<ItemPauseResponse> {
    const rq = await this.client.post(`/item/${itemId}/republish`, {})
    return ItemPauseResponseSchema.parse(rq)
  }
}
