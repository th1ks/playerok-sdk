/** Маскированные данные выбранной платёжной карты. */
export interface ChoosenCardResponse {
  /** Идентификатор карты. */
  id: string;

  /** Первые шесть цифр номера карты. */
  cardFirstSix: string;

  /** Последние четыре цифры номера карты. */
  cardLastFour: string;

  /** Тип платёжной карты. */
  cardType: string;

  /** Выбрана ли карта для текущих операций. */
  isChosen: boolean;
}
