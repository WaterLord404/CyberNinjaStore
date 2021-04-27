import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadCrumbsI } from '../../Interfaces/bread-crumbsI';
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

  breadCrumbs: Array<BreadCrumbsI> = [];
  isSorterIconActive: boolean;

  constructor(
    private breadCrumbsService: BreadCrumbsService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.breadCrumbsService.getBread().subscribe(res => this.breadCrumbs = res);
    this.breadCrumbsService.getSorterState().subscribe(res => this.isSorterIconActive = res);
  }

  ngOnInit(): void {
  }

  /**
   * Filtra los productos
   * @param filter
   */
  filterProducts(filter: string): void {
    this.productService.resetPage();
    let category = this.route.snapshot.paramMap.get('category');
    if (category === undefined) { category = null; }
    this.productService.loadProducts(category, filter);
  }
}
