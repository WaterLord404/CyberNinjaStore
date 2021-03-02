import { Injectable } from '@angular/core';
import { BreadCrumbsI } from '../Interfaces/bread-crumbsI';

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbsService {

  breadCrumbs: Array<BreadCrumbsI>;
  isSorterIconActive: boolean;

  constructor() { }

  /**
   * Construye un array de BreadCrumbsI para la nueva miga de pan
   * @param string
   */
  updateBreadCrumbs(res: string): Array<BreadCrumbsI> {
    this.isSorterIconActive = false;
    switch (res) {
      case 'Products':
        this.breadCrumbs = [
          { location: 'Home/', src: '' },
          { location: 'Products' },
        ];
        this.isSorterIconActive = true;
        break;
      default:
        this.breadCrumbs = [
          { location: 'Home/', src: '' },
          { location: 'Products/', src: '/products' },
          { location: res }
        ];
        break;
    }
    return this.breadCrumbs;
  }

  getSorterState(): boolean {
    return this.isSorterIconActive;
  }
}
