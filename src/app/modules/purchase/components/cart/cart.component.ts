import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/core/services/document.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { OrderDetailsI } from 'src/app/modules/purchase/interfaces/order-details';
import { ProductI } from 'src/app/modules/product/Interfaces/productI';
import { CartBadgeService } from 'src/app/core/services/cart-badge.service';
import { CartService } from 'src/app/modules/purchase/services/cart.service';
import { CouponI } from '../../interfaces/coupon';
import { CheckoutService } from '../../services/checkout.service';
import { LoaderService } from 'src/app/core/services/loader.service';

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
  couponComponent = false;
  coupon: CouponI;
  totalPrice: number;
  discount: number;
  isLoading = true;

  constructor(
    protected router: Router,
    protected documentService: DocumentService,
    private cartService: CartService,
    private cartBadgeService: CartBadgeService,
    private snackBarService: SnackBarService,
    private checkoutService: CheckoutService,
    private loaderService: LoaderService
  ) {
    this.loaderService.loading().subscribe(res => this.isLoading = res);
  }

  // Obtiene los productos del carrito
  ngOnInit(): void {
    window.scroll(0, 0);
    this.totalPrice = 0;
    this.coupon = null;
    this.discount = 0;

    const ordersDetailsLocal: Array<OrderDetailsI> = JSON.parse(localStorage.getItem('cart'));

    if (ordersDetailsLocal == null) { return; }

    this.cartService.getCartProduct(ordersDetailsLocal)
      .subscribe(
        res => {
          this.ordersDetails = res;
          localStorage.setItem('cart', JSON.stringify(this.cartService.clearOrderDetailsDocuments(this.ordersDetails)));
          this.cartBadgeService.update();
        },
        () => {
          localStorage.removeItem('cart');
          this.cartBadgeService.update();
          this.snackBarService.popup(500);
        }
      );
  }

  /**
   * Calcula el precio total del carrito redondeando 2 decimales
   */
  calculateTotalPrice(): number {
    let resul = 0;
    this.ordersDetails.forEach(element => {
      resul = resul + (element.product.totalPrice * element.units);
    });
    this.totalPrice = (Math.round(resul * 100) / 100);
    return this.totalPrice;
  }

  /**
   * Calcula el precio total con descuento
   */
  calculateTotalPriceWithCoupon(): number {
    if (this.coupon.discount.type === 'FIXED') {
      this.totalPrice = this.totalPrice - this.coupon.discount.value;
      this.discount = this.coupon.discount.value;

    } else if (this.coupon.discount.type === 'PERCENTAGE') {
      this.discount = this.calculateDiscountPercentage(this.totalPrice, this.coupon.discount.value);
      this.totalPrice = this.totalPrice - this.discount;
    }

    if (this.totalPrice <= 0) { this.totalPrice = 0; }

    this.totalPrice = (Math.round(this.totalPrice * 100) / 100);
    return this.totalPrice;
  }

  /**
   * Calcula el porcentage en € redondeando
   * @param price
   * @param discount
   */
  calculateDiscountPercentage(price: number, discount: number): number {
    return Math.round((price * (discount / 100)) * 100) / 100;
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
    this.checkoutService.saveCoupon(this.coupon);
    this.checkoutService.saveTotalPrice(this.totalPrice);
    this.checkoutService.saveOrdersDetails(this.ordersDetails);
    this.checkoutService.saveDiscount(this.discount);
    this.checkoutService.setStatus(true);

    this.router.navigate(['/checkout']);
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
