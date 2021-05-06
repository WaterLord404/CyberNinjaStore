import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickedCheckoutGuard } from 'src/app/core/guards/clicked-checkout.guard';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaypalComponent } from './components/paypal/paypal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [ClickedCheckoutGuard] }
];

@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    CouponComponent,
    PaypalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxPayPalModule,
    MatProgressSpinnerModule
  ]
})
export class PurchaseModule { }
