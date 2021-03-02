import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackBarService } from '../services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) { }

  canActivate(): boolean {
    if (this.authService.isAdmin() === false) {
      this.router.navigate(['/account/login']);
      this.snackBarService.popup(403);
      return false;
    }
    return true;
  }
}
