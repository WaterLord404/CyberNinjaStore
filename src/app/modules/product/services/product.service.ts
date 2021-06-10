import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductI } from '../Interfaces/productI';

@Injectable({
  providedIn: 'any',
})
export class ProductService {

  url = 'product';
  private products = new BehaviorSubject<Array<ProductI>>([]);
  actualPage = 0;
  category: string;
  filter: string;

  // Comprueba si han cargado los productos
  isLoaded: boolean;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Resetea los productos y el contador de la pagina
   */
  resetPage(): void {
    this.products.next([]);
    this.actualPage = 0;
    this.isLoaded = true;
  }

  loadProducts(category: string, filter?: string): void {
    this.category = category;
    if (filter === undefined) {
      this.filter = null;
    } else {
      this.filter = filter;
    }

    this.isLoaded = false;

    // Obtiene los productos
    this.getProducts(this.category, this.filter, this.actualPage).subscribe(
      res => {
        res.forEach(element => {
          this.products.value.push(element);
        });
        this.isLoaded = true;
        this.actualPage++;
      },
      () => { }
    );
  }

  /**
   * Actualiza la pagina
   */
  onScroll(): void {
    if (this.isLoaded) {
      // Obtiene los productos
      this.loadProducts(this.category, this.filter);
    }
  }

  /**
   * Devuelve los productos
   */
  getProductsList(): Observable<any> {
    return this.products.asObservable();
  }

  /**
   * Obtiene todos los productos dependiendo de la categoria y filtro
   */
  getProducts(category: string, filter: string, page: number): Observable<any> {

    let params = '?page=' + page;

    if (category !== null && filter !== null) {
      params += '&category=' + category + '&filter=' + filter;

    } else if (category !== null) {
      params += '&category=' + category;

    } else if (filter !== null) {
      params += '&filter=' + filter;
    }

    return this.http.get(this.url + params);
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
    return this.http.get(this.url + '/colour');
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
