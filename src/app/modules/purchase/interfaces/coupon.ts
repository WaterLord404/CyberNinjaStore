import { DiscountI } from "../../product/Interfaces/discount";

export interface CouponI {
  code: string;
  discount?: DiscountI;
}
