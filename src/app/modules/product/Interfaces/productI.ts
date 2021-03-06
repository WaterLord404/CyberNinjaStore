import { DocumentI } from './documentI';

export interface ProductI {
  id?: number;
  name: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  priceWoutDiscount?: number;
  totalPrice?: number;
  discount: number;
  size: Array<string>;
  colour: Array<string>;
  category: Array<string>;
  documents?: Array<DocumentI>;
  active?: boolean;
}
