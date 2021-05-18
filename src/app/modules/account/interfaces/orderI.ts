import { OrderDetailsI } from '../../purchase/interfaces/order-details';
import { ShippingI } from './shippingI';

export interface OrderI {
  id: number;
  purchaseDate: Date;
  totalPrice: number;
  shipping: ShippingI;
  ordersDetails: Array<OrderDetailsI>;
}
