import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderDetailsI } from '../interfaces/order-details';
import { ProductI } from '../modules/product/Interfaces/productI';

@Injectable({
  providedIn: 'root'
})
export class CartBadgeService {

  private cartBadgeCount = new BehaviorSubject<string>(this.getLocalData());

  constructor() { }

  /**
   * Setea cartBadgeCount cada vez que se llame al servicio
   */
  private getLocalData(): string {
    let count = 0;

    if (localStorage.getItem('cart') == null || localStorage.getItem('cart') === '[]') {
      this.clear();
      return undefined;
    }

    const ordersDetails: Array<OrderDetailsI> = JSON.parse(localStorage.getItem('cart'));
    ordersDetails.forEach(element => {
      count = count + element.units;
    });
    return count.toString();
  }

  /**
   * Obtiene el numero de productos y lo guarda como insignia
   */
  update(): void {
    this.cartBadgeCount.next(this.getLocalData());
  }

  /**
   * Limpia el carrito
   */
  clear(): void {
    localStorage.removeItem('cart');
  }

  /**
   * Obtiene el numero de cartBadge
   *  @returns {Observable<string>}
   */
  getCartBadgeCount(): Observable<string> {
    return this.cartBadgeCount.asObservable();
  }
}
