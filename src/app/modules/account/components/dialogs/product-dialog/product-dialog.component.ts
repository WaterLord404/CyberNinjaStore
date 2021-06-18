import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { OrderDetailsI } from 'src/app/modules/purchase/interfaces/order-details';
import { OrderService } from 'src/app/modules/purchase/services/order.service';
import { OrderI } from '../../../interfaces/orderI';
import { RatingDialogComponent } from '../rating-dialog/rating-dialog.component';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  order: OrderI;
  orderDetail: OrderDetailsI;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public router: Router,
    private orderService: OrderService,
    private snackBarService: SnackBarService
  ) {
    this.order = data.order;
    this.orderDetail = data.orderDetail;
  }

  ngOnInit(): void { }

  goToRatingDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(RatingDialogComponent, {
      width: '100%',
      maxWidth: '60vh',
      height: 'auto',
      data: this.orderDetail.product
    });
  }

  /**
   * Comprueba si la fecha esta dentro del plazo para la devolucion
   * @returns
   */
  checkReturnDate(): boolean {
    const date = new Date();
    const shippingDate = new Date(this.order.shipping.updateDate);
    const shippingDateExp = new Date(this.order.shipping.updateDate);
    shippingDateExp.setDate(shippingDate.getDate() + 30);

    return (date > shippingDate && date < shippingDateExp) && this.orderDetail.returned === false;
  }

  /**
   * Devuelve el producto
   */
  returnProduct(): void {
    this.orderService.returnProduct(this.order.shipping, this.orderDetail).subscribe(
      () => {
        this.dialog.closeAll();
        this.router.navigate(['/account/orders']);
        this.snackBarService.popup(215);
      },
      () => this.snackBarService.popup(500)
    );
  }
}
