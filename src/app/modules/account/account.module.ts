import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { IsLoggedGuard } from 'src/app/core/guards/is-logged.guard';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';

import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { OrdersComponent } from './components/orders/orders.component';
import { MenuComponent } from './components/menu/menu.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingDialogComponent } from './components/dialogs/rating-dialog/rating-dialog.component';
import { ProductDialogComponent } from './components/dialogs/product-dialog/product-dialog.component';
import { OrderDialogComponent } from './components/dialogs/order-dialog/order-dialog.component';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  { path: '', component: MenuComponent, canActivate: [IsLoggedGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [IsLoggedGuard] },
  { path: 'confirm-account/:token', component: ConfirmAccountComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [IsLoggedGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ConfirmAccountComponent,
    OrdersComponent,
    MenuComponent,
    OrderDialogComponent,
    RatingDialogComponent,
    ProductDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    SocialLoginModule,
    MatDialogModule,
    NgbRatingModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientID),
          }
        ],
      } as SocialAuthServiceConfig,
    }
  ]
})
export class AccountModule { }
