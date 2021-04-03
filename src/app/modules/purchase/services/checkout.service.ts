import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CouponI } from '../interfaces/coupon';
import { OrderDetailsI } from '../interfaces/order-details';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private totalPrice = new BehaviorSubject<number>(null);
  private coupon = new BehaviorSubject<CouponI>(null);
  private ordersDetails = new BehaviorSubject<Array<OrderDetailsI>>(null);
  private status = new BehaviorSubject<boolean>(null);

  constructor() { }

  setStatus(status: boolean): void {
    this.status.next(status);
  }

  saveTotalPrice(totalPrice: number): void {
    this.totalPrice.next(totalPrice);
  }

  saveCoupon(coupon: CouponI): void {
    this.coupon.next(coupon);
  }

  saveOrdersDetails(ordersDetails: Array<OrderDetailsI>): void {
    this.ordersDetails.next(ordersDetails);
  }

  getCoupon(): Observable<CouponI> {
    return this.coupon.asObservable();
  }

  getTotalPrice(): Observable<number> {
    return this.totalPrice.asObservable();
  }

  getOrdersDetails(): Observable<Array<OrderDetailsI>> {
    return this.ordersDetails.asObservable();
  }

  getStatus(): boolean {
    let status = false;
    this.status.asObservable().subscribe(res => status = res);
    return status;
  }
}
