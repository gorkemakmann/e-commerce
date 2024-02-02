import {OrderLine} from "./orderLine.model";

export interface CreateOrder {

  totalItems: number,
  orderLines: OrderLine[],
  totalPrice: number,
  userId: string,
  isDiscountApplied: boolean
}
