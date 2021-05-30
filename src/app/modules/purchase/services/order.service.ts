import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShippingI } from '../../account/interfaces/shippingI';
import { ProductI } from '../../product/Interfaces/productI';
import { CouponI } from '../interfaces/coupon';
import { OrderDetailsI } from '../interfaces/order-details';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = 'order';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Realiza la compra
   * @param ordersDetails
   * @param coupon
   */
  buyCart(ordersDetails: Array<OrderDetailsI>, coupon: CouponI): Observable<any> {
    let couponCode = '';

    if (coupon != null) {
      couponCode = '?coupon=' + coupon.code;
    }

    return this.http.post(this.url + couponCode, ordersDetails);
  }

  /**
   * Obtiene las orders con su envio
   */
  getOrders(): Observable<any> {
    return this.http.get(this.url);
  }

  /**
   * Devuelve un producto
   *
   * @param product
   * @returns
   */
  returnProduct(shippingV: ShippingI, orderDetailsV: OrderDetailsI): Observable<any> {
    return this.http.put(this.url, { shipping: shippingV, orderDetails: orderDetailsV });
  }
}
