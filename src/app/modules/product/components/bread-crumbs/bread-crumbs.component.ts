import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadCrumbsI } from '../../Interfaces/bread-crumbsI';
import { ProductI } from '../../Interfaces/productI';
import { BreadCrumbsService } from '../../services/bread-crumbs.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('500ms ease-in', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class BreadCrumbsComponent implements OnInit {

  @Input() breadCrumbsEvent: EventEmitter<string>;
  breadCrumbs: Array<BreadCrumbsI> = [];
  isSorterIconActive: boolean;

  constructor(
    private breadCrumbsService: BreadCrumbsService,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.breadCrumbsEvent.subscribe(res => {
      this.breadCrumbs = this.breadCrumbsService.updateBreadCrumbs(res);
      this.isSorterIconActive = this.breadCrumbsService.getSorterState();
    });
  }

  filterProducts(filter: string): void {
    const category = this.route.snapshot.paramMap.get('category');

    this.productService.getProducts(category, filter).subscribe(
      res => this.productService.setProducts(res)
    );
  }
}
