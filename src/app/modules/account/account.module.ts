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
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

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
    OrderDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    SocialLoginModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('899814992698-rfm638ehb7fb39t7t52c6j44du35fg8h.apps.googleusercontent.com'),
          }
        ],
      } as SocialAuthServiceConfig,
    }
  ]
})
export class AccountModule { }
