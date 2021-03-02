import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductI } from '../Interfaces/productI';

@Injectable({
  providedIn: 'any',
})
export class ProductService {

  url = 'product';

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Obtiene todos los productos
   */
  getProducts(): Observable<any> {
    return this.http.get(environment.domain + this.url);
  }

  /**
   * Obtiene un producto
   * @param id
   */
  getProduct(id: string): Observable<any> {
    return this.http.get(environment.domain + this.url + '/' + id);
  }

  addProduct(item: ProductI, files: FileList): Observable<any> {
    const formData: any = new FormData();

    formData.append('images', files[0]);
    formData.append('product', JSON.stringify(item));

    return this.http.post(environment.domain + this.url, formData);
  }

  /**
   * Borra un producto
   */
  deleteProduct(item: ProductI): Observable<any> {
    return this.http.request('delete', environment.domain + this.url, { body: item });
  }
}
