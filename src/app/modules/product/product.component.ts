import { ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { BreadCrumbsI } from './Interfaces/bread-crumbsI';
import { BreadCrumbsService } from './services/bread-crumbs.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: []
})
export class ProductComponent implements OnInit {

  breadCrumbsEvent: EventEmitter<string>;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Envia el evento a la clase bread crumbs
   * @param EventEmitter<string>
   */
  updateBreadCrumbs(event: EventEmitter<string>): void {
    this.breadCrumbsEvent = event;
  }

}
