import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewI } from '../Interfaces/reviewI';

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

  addReview(idProduct: number, review: ReviewI): Observable<any> {
    return this.http.post(this.url + '/' + idProduct, review);
  }
}
