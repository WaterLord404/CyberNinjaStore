import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/modules/purchase/services/order.service';
import { OrderI } from '../../interfaces/orderI';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('300ms ease-in', style({ opacity: '1' })),
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        animate('300ms ease-out', style({ opacity: '0' }))
      ])
    ]),
  ],
})
export class OrdersComponent implements OnInit {

  orders: Array<OrderI> = [];

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);

    this.orderService.getOrders().subscribe(
      res => this.orders = res,
      () => { }
    );
  }

  openDialog(order: OrderI): void {
    this.dialog.open(OrderDialogComponent, {
      width: '100%',
      height: 'auto',
      data: order
    });
  }

}
