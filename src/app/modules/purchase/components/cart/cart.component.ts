import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/core/services/document.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { OrderDetailsI } from 'src/app/modules/purchase/interfaces/order-details';
import { ProductI } from 'src/app/modules/product/Interfaces/productI';
import { CartBadgeService } from 'src/app/core/services/cart-badge.service';
import { CartService } from 'src/app/modules/purchase/services/cart.service';
import { OrderDetailsService } from '../../services/order-details.service';
import { CouponI } from '../../interfaces/coupon';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('300ms ease-in', style({ opacity: '1' })),
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
  coupon: CouponI;
  couponComponent = false;
  totalPrice: number;

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
          this.clearInactiveProducts(res, ordersDetailsLocal);
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
  private clearInactiveProducts(res: Array<OrderDetailsI>, ordersDetailsLocal: Array<OrderDetailsI>): void {
    const ordersDetailsCleared: Array<OrderDetailsI> = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < res.length; i++) {
      if (res[i].product.active) {
        ordersDetailsCleared.push(res[i]);
      } else {
        ordersDetailsLocal.splice(i, 1);
      }
    }

    this.ordersDetails = ordersDetailsCleared;
  }

  /**
   * Calcula el precio total del carrito redondeando 2 decimales
   */
  calculateTotalPrice(): number {
    let resul = 0;
    this.ordersDetails.forEach(element => {
      resul = resul + (element.product.totalPrice * element.units);
    });
    this.totalPrice = resul;
    return (Math.round(resul * 100) / 100);
  }

  /**
   * Calcula el precio total con descuento
   */
  calculateTotalPriceWithCoupon(): number {
    if (this.coupon.discount.type === 'FIXED') {
      this.totalPrice = this.totalPrice - this.coupon.discount.value;
    } else if (this.coupon.discount.type === 'PERCENTAGE') {
      this.totalPrice = this.calculateDiscountPercentage(this.totalPrice, this.coupon.discount.value);
    }

    if (this.totalPrice <= 0) { this.totalPrice = 0; }
    return (Math.round(this.totalPrice * 100) / 100);
  }

  /**
   * Calcula el porcentage a un precio
   * @param price
   * @param discount
   */
  calculateDiscountPercentage(price: number, discount: number): number {
    return price - (price * (discount / 100));
  }

  /**
   * Calcula el precio total de cada producto redondeando 2 decimales
   * @param price
   * @param units
   */
  calculatePrice(price: number, units: number): number {
    return Math.round((price * units) * 100) / 100;
  }

  /**
   * Realiza la compra del carrito
   */
  checkout(): void {
    this.orderDetailsService.buyCart(this.ordersDetails, this.coupon).subscribe(
      () => {
        this.snackBarService.popup(220);
        this.cartBadgeService.clear();
        this.cartBadgeService.update();
        this.router.navigate(['/']);
      },
      () => {
        this.totalPrice = 0;
        this.coupon = null;
        this.snackBarService.popup(500);
      }
    );
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

  /**
   * Guarda el cupon
   * @param coupon
   */
  saveCoupon(coupon: CouponI): void {
    this.coupon = coupon;
  }

}
