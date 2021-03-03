import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { BreadCrumbsI } from '../../Interfaces/bread-crumbsI';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('500ms ease-in', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class BreadCrumbsComponent implements OnInit {

  @Input() breadCrumbs: Array<BreadCrumbsI> = [];
  @Input() isSorterIconActive: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
