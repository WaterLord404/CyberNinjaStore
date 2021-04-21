import { DiscountI } from "../../product/Interfaces/discountI";

export interface CouponI {
  code: string;
  discount?: DiscountI;
}
