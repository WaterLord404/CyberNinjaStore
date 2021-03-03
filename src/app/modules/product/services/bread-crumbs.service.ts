import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreadCrumbsI } from '../Interfaces/bread-crumbsI';

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbsService {

  breadCrumbs: Array<BreadCrumbsI>;
  isSorterIconActive = new BehaviorSubject<boolean>(false);

  constructor() { }

  /**
   * Construye un array de BreadCrumbsI para la nueva miga de pan
   * @param string
   */
  updateBreadCrumbs(res: string): Array<BreadCrumbsI> {
    this.isSorterIconActive.next(false);

    switch (res) {
      case 'Products':
        this.breadCrumbs = [
          { location: 'Home/', src: '' },
          { location: 'Products' },
        ];
        this.isSorterIconActive.next(true);
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

  /**
   * obtiene el estado del icono de ordenar por
   */
  getSorterState(): boolean {
    let status = false;
    this.isSorterIconActive.asObservable().subscribe(res => status = res);
    return status;
  }
}
