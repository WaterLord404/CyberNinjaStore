import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/core/services/document.service';
import { ProductI } from '../../Interfaces/productI';
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

  products: Array<ProductI>;
  @Output() breadEvent = new EventEmitter<string>();

  constructor(
    private productService: ProductService,
    private router: Router,
    protected documentService: DocumentService,
    private route: ActivatedRoute
  ) { }

  /**
   * Carga todos los productos con la categoria
   */
  ngOnInit(): void {
    const category = this.route.snapshot.paramMap.get('category');

    this.productService.getProducts(category).subscribe(
      res => {
        this.products = res;
        if (category === null) {
          this.breadEvent.emit('products');
        } else {
          this.breadEvent.emit(category);
        }
      },
      () => { }
    );
  }

  /**
   * Redirige a el item especificado y envia el objeto para una carga mas rapida
   * @param product
   */
  navigateToProduct(item: ProductI): void {
    this.router.navigate(['products/p/' + item.id], { state: { item } });
  }
}
