import { ProductI } from "../../product/Interfaces/productI";

export interface OrderDetailsI {
  units: number;
  color: string;
  size: string;
  product: ProductI;
}
