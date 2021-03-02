import { Component, Input, OnInit } from '@angular/core';
import { BreadCrumbsI } from '../../Interfaces/bread-crumbsI';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss']
})
export class BreadCrumbsComponent implements OnInit {

  @Input() breadCrumbs: Array<BreadCrumbsI> = [];
  @Input() filterActive: boolean;
  constructor() {
  }

  ngOnInit(): void {
  }

}
