import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreadCrumbsI } from '../Interfaces/bread-crumbsI';

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbsService {

  breadCrumbs: Array<BreadCrumbsI> = [];
  isSorterIconActive = new BehaviorSubject<boolean>(false);
  categoryLocation = false;
  activeCategory: string;

  constructor() { }

  /**
   * Construye un array de BreadCrumbsI para la nueva miga de pan
   * @param string
   */
  updateBreadCrumbs(res: string): Array<BreadCrumbsI> {
    this.isSorterIconActive.next(false);

    this.breadCrumbs = [];
    this.breadCrumbs.push({ location: 'Home/', src: '' });

    if (res === 'products') {
      this.generateBreadProducts();

    } else if (res === 'new' || res === 'women' || res === 'pants' || res === 'jackets' || res === 'accessories') {
      this.activeCategory = res[0].toUpperCase() + res.substr(1);
      this.generateBreadCategory(res);

    } else {
      if (this.categoryLocation) {
        this.generateBreadCategory(res);
        this.breadCrumbs.push({ location: '/' + res });
      }
      else {
        this.generateBreadProducts();
        this.breadCrumbs.push({ location: '/' + res });
      }
    }

    return this.breadCrumbs;
  }

  private generateBreadCategory(res: string): void {
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
  getSorterState(): boolean {
    let status = false;
    this.isSorterIconActive.asObservable().subscribe(res => status = res);
    return status;
  }
}
