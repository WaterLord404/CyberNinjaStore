import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  url = 'review';

  constructor(
    private http: HttpClient
  ) { }

  getProductReviews(productId: string): Observable<any> {
    return this.http.get(this.url + '/' + productId);
  }
}
