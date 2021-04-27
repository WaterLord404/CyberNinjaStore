import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ItemComponent } from './components/item/item.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './product.component';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemReviewComponent } from './components/item-review/item-review.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { IsAdminGuard } from 'src/app/core/guards/is-admin.guard';
import { IsLoggedGuard } from 'src/app/core/guards/is-logged.guard';
import { MatSelectModule } from '@angular/material/select';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

const routes: Routes = [
  {
    path: '', component: ProductComponent, children: [
      { path: '', outlet: 'aux', component: ProductsComponent },
    ]
  },

  { path: 'new-product', component: NewProductComponent, canActivate: [IsAdminGuard, IsLoggedGuard] },

  {
    path: ':category', component: ProductComponent, children: [
      { path: '', outlet: 'aux', component: ProductsComponent },
    ]
  },
  {
    path: 'p/:id', component: ProductComponent, children: [
      { path: '', outlet: 'aux', component: ItemComponent },
    ]
  }
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    BreadCrumbsComponent,
    ItemComponent,
    ItemReviewComponent,
    NewProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatCarouselModule,
    MatMenuModule,
    ReactiveFormsModule,
    NgbRatingModule,
    MatSelectModule,
    InfiniteScrollModule
  ],
  providers: [
    ProductsComponent
  ]
})
export class AppProductModule { }
