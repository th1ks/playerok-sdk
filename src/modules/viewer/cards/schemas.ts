import z, { boolean, string } from "zod";

export const ChoosenCardResonseSchmea = z.object({
  id: string(),
  cardFirstSix: string(),
  cardLastFour: string(),
  cardType: string(),
  isChosen: boolean()
})
