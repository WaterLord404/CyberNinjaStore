import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetailsI } from 'src/app/interfaces/order-details';
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
    return this.http.get(this.url);
  }

  /**
   * Obtiene un producto
   * @param id
   */
  getProduct(id: string): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  /**
  * Crea un producto
  * @param item
  * @param files
  */
  addProduct(item: ProductI, files: FileList): Observable<any> {
    let formData: any = new FormData();

    formData = this.appendFilesToFormData(formData, files);
    formData.append('product', JSON.stringify(item));

    return this.http.post(this.url, formData);
  }

  /**
   * Añade las imagenes a la peticion
   * @param formData
   */
  private appendFilesToFormData(formData: FormData, files: FileList): FormData {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    return formData;
  }

  /**
   * Borra un producto
   */
  deleteProduct(item: ProductI): Observable<any> {
    return this.http.request('delete', this.url, { body: item });
  }
}
