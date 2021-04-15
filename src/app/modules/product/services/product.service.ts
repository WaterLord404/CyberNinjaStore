import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  getProducts(category: string): Observable<any> {

    if (category === null) {
      category = '';
    } else {
      category = '?category=' + category;
    }

    return this.http.get(this.url + category);
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

  /**
   * Obtiene los colores
   */
  getColours(): Observable<any> {
    return this.http.get(this.url + '/color');
  }


  /**
   * Obtiene los tamaños
   */
  getSizes(): Observable<any> {
    return this.http.get(this.url + '/size');
  }

  /**
   * Obtiene las categorias
   */
  getCategories(): Observable<any> {
    return this.http.get(this.url + '/category');
  }
}
