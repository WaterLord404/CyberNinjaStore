import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/core/services/document.service';
import { ProductI } from 'src/app/modules/product/Interfaces/productI';
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

  constructor(
    protected router: Router,
    protected documentService: DocumentService,
    private cartService: CartService,
    private cartBadgeService: CartBadgeService
  ) { }

  // Obtiene los productos del carrito
  ngOnInit(): void {
    window.scroll(0, 0);
    this.cartProducts = JSON.parse(localStorage.getItem('cart'));
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
