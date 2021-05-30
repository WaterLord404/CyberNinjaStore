import { ProductI } from '../../product/Interfaces/productI';

export interface OrderDetailsI {
  id?: number;
  units: number;
  colour: string;
  size: string;
  product: ProductI;
  returned?: boolean;
}
