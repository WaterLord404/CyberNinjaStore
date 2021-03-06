import { animate, style, transition, trigger } from '@angular/animations';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/core/services/document.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { ProductI } from 'src/app/modules/product/Interfaces/productI';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { CartBadgeService } from 'src/app/services/cart-badge.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('30ms ease-in', style({ opacity: '1' })),
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        animate('300ms ease-out', style({ opacity: '0' }))
      ])
    ]),
  ],
})
export class CartComponent implements OnInit {

  cartProducts: Array<ProductI>;
  productsLocal: Array<number>;

  constructor(
    protected router: Router,
    protected documentService: DocumentService,
    private cartService: CartService,
    private cartBadgeService: CartBadgeService,
    private productService: ProductService,
    private snackBarService: SnackBarService
  ) { }

  // Obtiene los productos del carrito
  ngOnInit(): void {
    window.scroll(0, 0);

    this.productsLocal = JSON.parse(localStorage.getItem('cart'));
    if (this.productsLocal == null) { return; }

    this.productService.getCartProduct(this.productsLocal)
      .subscribe(
        res => {
          this.cartProducts = this.clearInactiveProducts(res);
          this.cartBadgeService.update();
        },
        () => this.snackBarService.popup(500)
      );
  }

  /**
   * Elimina los productos que no estan activos-> si se han desactivado de la BD y el
   * usuario lo mantiene en el localstorage
   * @param res
   */
  private clearInactiveProducts(res: Array<ProductI>) {
    const productsCleared: Array<ProductI> = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < res.length; i++) {
      if (res[i].active) {
        productsCleared.push(res[i]);
      }
    }

    const newProductsLocal = this.generateIds(productsCleared);
    // Actualiza los productos del local storage
    localStorage.setItem('cart', JSON.stringify(newProductsLocal));
    return productsCleared;
  }

  /**
   * Genera la nueva lista de ids que se guardara en localstorage
   * @param productsCleared
   */
  private generateIds(productsCleared: Array<ProductI>): Array<number> {
    const newProductsLocal: Array<number> = [];
    productsCleared.forEach(element => {
      newProductsLocal.push(element.id);
    });
    return newProductsLocal;
  }

  /**
   * Borra un producto del carrito
   * @param item: ProductI
   */
  deleteThisItem(item: ProductI): void {
    this.cartProducts = this.cartService.deleteThisItem(item, this.cartProducts);
    // Actualiza el productBadge
    this.cartBadgeService.update();
  }
}
