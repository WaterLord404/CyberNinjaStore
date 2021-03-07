import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/core/services/document.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { OrderDetailsI } from 'src/app/interfaces/order-details';
import { ProductI } from 'src/app/modules/product/Interfaces/productI';
import { CartBadgeService } from 'src/app/services/cart-badge.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderDetailsService } from 'src/app/services/order-details.service';

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

  ordersDetails: Array<OrderDetailsI> = [];

  constructor(
    protected router: Router,
    protected documentService: DocumentService,
    private cartService: CartService,
    private cartBadgeService: CartBadgeService,
    private orderDetailsService: OrderDetailsService,
    private snackBarService: SnackBarService
  ) { }

  // Obtiene los productos del carrito
  ngOnInit(): void {
    window.scroll(0, 0);

    const ordersDetailsLocal: Array<OrderDetailsI> = JSON.parse(localStorage.getItem('cart'));
    if (ordersDetailsLocal == null) { return; }

    this.orderDetailsService.getCartProduct(ordersDetailsLocal)
      .subscribe(
        res => {
          this.ordersDetails = this.clearInactiveProducts(res, ordersDetailsLocal);
          localStorage.setItem('cart', JSON.stringify(this.ordersDetails));
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
  private clearInactiveProducts(res: Array<OrderDetailsI>, ordersDetailsLocal: Array<OrderDetailsI>): Array<OrderDetailsI> {
    const ordersDetailsCleared: Array<OrderDetailsI> = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < res.length; i++) {
      if (res[i].product.active) {
        ordersDetailsCleared.push(res[i]);
      } else {
        ordersDetailsLocal.splice(i, 1);
      }
    }

    return ordersDetailsCleared;
  }

  /**
   * Borra un producto del carrito
   * @param item: ProductI
   */
  deleteThisItem(item: ProductI): void {
    this.ordersDetails = this.cartService.deleteThisItem(item, this.ordersDetails);
    // Actualiza el productBadge
    this.cartBadgeService.update();
  }
}
