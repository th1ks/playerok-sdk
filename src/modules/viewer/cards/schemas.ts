import z, { boolean, string } from "zod";

export const ChoosenCardResponseSchmea = z.object({
  id: string(), // Айди карты
  cardFirstSix: string(), // Первые 6 цифр карты
  cardLastFour: string(), // Последние 4 цифры карты
  cardType: string(), // Тип карты
  isChosen: boolean() // Выбрана ли карта
})
