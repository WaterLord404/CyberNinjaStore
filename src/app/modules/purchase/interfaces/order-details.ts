import { ProductI } from '../../product/Interfaces/productI';

export interface OrderDetailsI {
  units: number;
  colour: string;
  size: string;
  product: ProductI;
}
