import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CheckoutService } from 'src/app/modules/purchase/services/checkout.service';
import { SnackBarService } from '../services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ClickedCheckoutGuard implements CanActivate {

  constructor(
    private router: Router,
    private checkoutService: CheckoutService,
    private snackBarService: SnackBarService
  ) { }

  canActivate(): boolean {
    if (this.checkoutService.getStatus()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
