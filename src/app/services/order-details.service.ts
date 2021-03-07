import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetailsI } from '../interfaces/order-details';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  url = 'order';

  constructor(
    private http: HttpClient
  ) { }

  /*
  * Obtiene los productos del carrito (order details)
  * @param ProductI
  */
  getCartProduct(ordersDetails: Array<OrderDetailsI>): Observable<any> {
    return this.http.post(this.url + '/cart', ordersDetails);
  }
}
