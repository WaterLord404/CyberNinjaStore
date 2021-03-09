import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { CartBadgeService } from 'src/app/services/cart-badge.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

  // Animacion para el menu desplegable
  animations: [
    trigger(
      'inOutAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])]
    )
  ]
})

export class HeaderComponent implements OnInit {

  isMenuActive = false;

  color: ThemePalette = 'warn';
  mode: ProgressBarMode = 'query';
  @Input('matBadge') cartBadgeCount: string | undefined;
  isLoading: boolean;

  constructor(
    private loaderService: LoaderService,
    protected router: Router,
    protected authService: AuthService,
    private snackBarService: SnackBarService,
    private cartBadgeService: CartBadgeService
  ) {
    // Muestra o oculta la barra de loading
    this.loaderService.loading().subscribe(res => this.isLoading = res);
    this.cartBadgeService.getCartBadgeCount().subscribe(res => this.cartBadgeCount = res);
  }

  ngOnInit(): void { }

  /**
   * Cierra la sesión
   */
  logout(): void {
    this.authService.logout();
    this.isMenuActive = false;
    this.cartBadgeService.clear();
    this.router.navigate(['/']);
    this.snackBarService.popup(211);
    window.scroll(0, 0);
  }
}
