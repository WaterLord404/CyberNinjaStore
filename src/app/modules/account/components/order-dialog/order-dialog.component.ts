import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductI } from 'src/app/modules/product/Interfaces/productI';
import { OrderI } from '../../interfaces/orderI';
import { RatingDialogComponent } from '../rating-dialog/rating-dialog.component';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {

  order: OrderI;
  starts: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
    this.order = data;
  }

  ngOnInit(): void {
  }

  rateProduct(product: ProductI): void {
    this.dialog.closeAll();
    this.dialog.open(RatingDialogComponent, {
      width: '100%',
      height: 'auto',
      data: product
    });
  }
}
