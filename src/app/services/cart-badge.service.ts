import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductI } from '../modules/product/Interfaces/productI';

@Injectable({
  providedIn: 'root'
})
export class CartBadgeService {

  private cartBadgeCount = new BehaviorSubject<string>(this.getLocalData());
  private localData: string;

  constructor() { }

  /**
   * Setea cartBadgeCount cada vez que se llame al servicio
   */
  private getLocalData(): string {
    if (localStorage.getItem('cart') == null || localStorage.getItem('cart') === '[]') {
      localStorage.removeItem('cart');
      return undefined;
    }

    return JSON.parse(localStorage.getItem('cart')).length.toString();
  }

  /**
   * Obtiene el numero de productos y lo guarda como insignia
   */
  update(): void {
    this.cartBadgeCount.next(this.getLocalData());
  }

  /**
   * Obtiene el numero de cartBadge
   *  @returns {Observable<string>}
   */
  getCartBadgeCount(): Observable<string> {
    return this.cartBadgeCount.asObservable();
  }
}
