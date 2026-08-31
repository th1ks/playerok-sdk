import type { HttpClient } from "../../http";
import { ActiveLotteryResponseSchema, PlTokensBalanceResponseSchema } from "./schemas";
import type { ActiveLotteryResponse, PlTokensBalanceResponse } from "./types";

export class LotteryAPI {
  constructor(private client: HttpClient) { }

  async getPlTokensBalance(): Promise<PlTokensBalanceResponse> {
    const r = await this.client.get("/pl-tokens/balance")
    return PlTokensBalanceResponseSchema.parse(r)
  }

  async getActiveLottry(): Promise<ActiveLotteryResponse> {
    const r = await this.client.get("/lottery/active")
    return ActiveLotteryResponseSchema.parse(r)
  }
}
