import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  url = 'discount';

  constructor(
    private http: HttpClient
  ) { }

  getDiscounts(): Observable<any> {
    return this.http.get(this.url);
  }

  setDiscount(itemId: number, discountId: number): Observable<any> {
    return this.http.put(this.url + '/' + itemId + '/' + discountId, null);
  }
}
