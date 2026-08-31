export interface ActiveLotteryResponse {
  /** Айди лотереи */
  lotteryId: string,
  /** Дата начала лотереи */
  startAt: string,
  /** Дата окончания действия розыгрыша */
  expirationAt: string,
  /** Время подведения итогов или определения результатов */
  summaryAt: string,
  /** Время публичного объявления результатов */
  announcementAt: string,
  /** Твич канал где будут итоги */
  twitchStreamUrl: string
}

export interface PlTokensBalanceResponse {
  /** Количество Пл-Токенов на балансе */
  available: number

  /** Непонятно что делает этот флаг */
  hasOnlyFirstPurchaseAccrual: boolean
}
