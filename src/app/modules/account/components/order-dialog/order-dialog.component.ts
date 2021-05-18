import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderI } from '../../interfaces/orderI';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {

  order: OrderI;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.order = data;
  }

  ngOnInit(): void {
  }

}
