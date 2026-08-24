/** Ответ остановки или переопубликации товара. */
export interface ItemPauseResponse {
  /** Успешно ли выполнена операция. */
  success: boolean;

  /** Текущий статус публикации товара. */
  status?: string | undefined;

  /** Можно ли остановить публикацию товара. */
  pauseAvailable?: boolean | undefined;

  /** Можно ли переопубликовать товар. */
  republishAvailable?: boolean | undefined;

  /** Может ли товар быть опубликован. */
  mayBePublished?: boolean | undefined;
}
