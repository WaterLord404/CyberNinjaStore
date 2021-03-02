import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CartComponent } from './components/cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInterceptorService } from './core/services/auth-interceptor.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IsLogged } from './core/guards/is-logged.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', loadChildren: () => import('./modules/product/product.module').then(m => m.AppProductModule) },
  { path: 'cart', component: CartComponent, canActivate: [IsLogged] },
  { path: 'account', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule) },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatBadgeModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
