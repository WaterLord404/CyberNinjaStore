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
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: ProductComponent, children: [
      { path: '', outlet: 'aux', component: ProductsComponent },
    ]
  },
  {
    path: ':id', component: ProductComponent, children: [
      { path: '', outlet: 'aux', component: ItemComponent },
    ]
  }
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    BreadCrumbsComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatCarouselModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class AppProductModule { }
