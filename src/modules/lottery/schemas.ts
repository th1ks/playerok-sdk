import z from "zod";
import type { ActiveLotteryResponse, PlTokensBalanceResponse } from "./types";

export const ActiveLotteryResponseSchema = z.object({
  lotteryId: z.string(),
  startAt: z.string(),
  expirationAt: z.string(),
  summaryAt: z.string(),
  announcementAt: z.string(),
  twitchStreamUrl: z.string()
}) satisfies z.ZodType<ActiveLotteryResponse>

export const PlTokensBalanceResponseSchema = z.object({
  available: z.number(),
  hasOnlyFirstPurchaseAccrual: z.boolean()
}) satisfies z.ZodType<PlTokensBalanceResponse>
