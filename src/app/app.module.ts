import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpInterceptorService } from './core/services/http-interceptor.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IsLoggedGuard } from './core/guards/is-logged.guard';
import { NewProductComponent } from './components/new-product/new-product.component';
import { IsAdminGuard } from './core/guards/is-admin.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', loadChildren: () => import('./modules/purchase/purchase.module').then(m => m.PurchaseModule), canActivate: [IsLoggedGuard] },

  { path: 'products', loadChildren: () => import('./modules/product/product.module').then(m => m.AppProductModule) },
  { path: 'account', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule) },

  { path: 'new-product', component: NewProductComponent, canActivate: [IsAdminGuard, IsLoggedGuard] },

  { path: '**', component: NotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent,
    NewProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatBadgeModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
