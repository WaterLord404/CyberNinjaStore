import { DiscountI } from './discountI';
import { DocumentI } from './documentI';

export interface ProductI {
  id?: number;
  name: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  priceWoutDiscount?: number;
  totalPrice?: number;
  stars?: number;
  discount?: DiscountI;
  size: Array<string>;
  colour: Array<string>;
  category: Array<string>;
  documents?: Array<DocumentI>;
  active?: boolean;
}
