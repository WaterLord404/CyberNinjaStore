import { ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { BreadCrumbsI } from './Interfaces/bread-crumbsI';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: []
})
export class ProductComponent implements OnInit {

  location: Array<BreadCrumbsI>;
  activeFilter = true;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  /**
   * Actualiza las migas de pan
   * @param EventEmitter<string>
   */
  updateLocation(event: EventEmitter<string>): void {
    event.subscribe(res => {
      switch (res) {
        case 'Products':
          this.location = [
            { location: 'Home/', src: '' },
            { location: 'Products' },
          ];
          break;
        default:
          this.location = [
            { location: 'Home/', src: '' },
            { location: 'Products/', src: '/products' },
            { location: res }
          ];
          this.activeFilter = false;
          break;
      }
    });
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
