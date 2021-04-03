import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartBadgeService } from 'src/app/core/services/cart-badge.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { UserI } from 'src/app/modules/account/interfaces/userI';
import { CouponI } from '../../interfaces/coupon';
import { OrderDetailsI } from '../../interfaces/order-details';
import { CheckoutService } from '../../services/checkout.service';
import { OrderDetailsService } from '../../services/order-details.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  ordersDetails: Array<OrderDetailsI> = [];
  coupon: CouponI;
  totalPrice: number;
  shipping = 5.99;
  user: UserI;
  finalPrice: number;

  constructor(
    private cartBadgeService: CartBadgeService,
    private orderDetailsService: OrderDetailsService,
    private snackBarService: SnackBarService,
    private authService: AuthService,
    private checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.checkoutService.getCoupon().subscribe(res => this.coupon = res);
    this.checkoutService.getTotalPrice().subscribe(res => this.totalPrice = res);
    this.checkoutService.getOrdersDetails().subscribe(res => this.ordersDetails = res);
  }

  payment(): void {
    this.orderDetailsService.buyCart(this.ordersDetails, this.coupon).subscribe(
      () => {
        this.snackBarService.popup(220);
        this.cartBadgeService.clear();
        this.cartBadgeService.update();

      },
      () => {
        this.totalPrice = 0;
        this.coupon = null;
        this.snackBarService.popup(500);
      }
    );
  }

  calculateFinalPrice(): number {
    this.finalPrice = (Math.round((this.totalPrice + this.shipping) * 100) / 100);
    return this.finalPrice;
  }
}
