import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { OrderDetailsI } from 'src/app/modules/purchase/interfaces/order-details';
import { OrderI } from '../../../interfaces/orderI';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

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
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {
    this.order = data;
  }

  ngOnInit(): void {
  }

  goToProductDialog(inputOrderDetail: OrderDetailsI): void {
    if (inputOrderDetail.returned) {
      this.snackBarService.popup(409);
      return;
    }
    this.dialog.closeAll();
    this.dialog.open(ProductDialogComponent, {
      width: '100%',
      height: 'auto',
      data: { order: this.order, orderDetail: inputOrderDetail }
    });
  }

}
