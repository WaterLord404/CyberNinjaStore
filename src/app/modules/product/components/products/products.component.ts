import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/core/services/document.service';
import { ProductI } from '../../Interfaces/productI';
import { BreadCrumbsService } from '../../services/bread-crumbs.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('500ms ease-in', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class ProductsComponent implements OnInit {

  products: Array<ProductI> = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    protected documentService: DocumentService,
    private route: ActivatedRoute,
    private breadCrumbsService: BreadCrumbsService
  ) {
    this.productService.getProductsList().subscribe(res => this.products = res);
  }

  /**
   * Carga todos los productos con la categoria
   */
  ngOnInit(): void {
    this.productService.resetPage();
    const category = this.route.snapshot.paramMap.get('category');
    this.productService.loadProducts(category);

    if (category === null) {
      this.breadCrumbsService.updateBreadCrumbs('products');
    } else {
      this.breadCrumbsService.updateBreadCrumbs(category);
    }
  }

  /**
   * Redirige a el item especificado y envia el objeto para una carga mas rapida
   * @param product
   */
  navigateToProduct(item: ProductI): void {
    this.router.navigate(['products/p/' + item.id], { state: { item } });
  }

  onScroll(): void {
    this.productService.onScroll();
  }

}
