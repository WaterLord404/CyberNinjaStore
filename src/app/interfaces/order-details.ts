import { ProductI } from "../modules/product/Interfaces/productI";

export interface OrderDetailsI {
  units: number;
  color: string;
  size: string;
  product: ProductI;
}
