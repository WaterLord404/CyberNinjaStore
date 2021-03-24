import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CouponI } from '../interfaces/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  url = 'coupon';

  constructor(
    private http: HttpClient
  ) { }

  getCoupon(coupon: CouponI): Observable<any> {
    return this.http.get(this.url, { params: { coupon: coupon.code } });
  }
}
