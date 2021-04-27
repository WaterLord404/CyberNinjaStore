import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreadCrumbsI } from '../Interfaces/bread-crumbsI';

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbsService {

  breadCrumbs: Array<BreadCrumbsI> = [];
  breadCrumbsSubject = new BehaviorSubject<Array<BreadCrumbsI>>(null);
  isSorterIconActive = new BehaviorSubject<boolean>(false);
  categoryLocation = false;
  activeCategory: string = undefined;

  constructor() { }

  /**
   * Construye un array de BreadCrumbsI para la nueva miga de pan
   * @param string
   */
  updateBreadCrumbs(res: string): void {

    this.breadCrumbs = [];
    this.breadCrumbs.push({ location: 'Home/', src: '' });

    // TODOS LOS PRODUCTOS
    if (res === 'products') {
      this.activeCategory = undefined;
      this.generateBreadProducts();

    }
    // POR CATEGORIA
    else if (res === 'new' || res === 'women' || res === 'pants' || res === 'jackets' || res === 'accessories') {
      this.activeCategory = res[0].toUpperCase() + res.substr(1);
      this.generateBreadCategory();

    }
    // PRODUCTO INDIVIDUAL
    else {
      // Con categoria
      if (this.activeCategory !== undefined) {
        this.generateBreadCategory();
        this.breadCrumbs.push({ location: '/' + res });
      }
      // Sin categoria
      else {
        this.generateBreadProducts();
        this.breadCrumbs.push({ location: '/' + res });
      }

      // Icono sorter desactivado
      this.isSorterIconActive.next(false);
    }

    this.breadCrumbsSubject.next(this.breadCrumbs);
  }

  private generateBreadCategory(): void {
    this.breadCrumbs.push(
      { location: 'Products/', src: '/products' },
      { location: this.activeCategory, src: '/products/' + this.activeCategory.toLocaleLowerCase() });
    this.isSorterIconActive.next(true);
    this.categoryLocation = true;
  }

  private generateBreadProducts(): void {
    this.breadCrumbs.push({ location: 'Products', src: '/products' });
    this.isSorterIconActive.next(true);
  }

  /**
   * obtiene el estado del icono de ordenar por
   */
  getSorterState(): Observable<any> {
    return this.isSorterIconActive.asObservable();
  }

  getBread(): Observable<any> {
    return this.breadCrumbsSubject.asObservable();
  }

}
