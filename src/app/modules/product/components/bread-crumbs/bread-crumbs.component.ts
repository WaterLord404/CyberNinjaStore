import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BreadCrumbsI } from '../../Interfaces/bread-crumbsI';
import { BreadCrumbsService } from '../../services/bread-crumbs.service';

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

  @Input() breadCrumbsEvent: EventEmitter<string>;
  breadCrumbs: Array<BreadCrumbsI> = [];
  isSorterIconActive: boolean;

  constructor(
    private breadCrumbsService: BreadCrumbsService
  ) { }

  ngOnInit(): void {
    this.breadCrumbsEvent.subscribe(res => {
      this.breadCrumbs = this.breadCrumbsService.updateBreadCrumbs(res);
      this.isSorterIconActive = this.breadCrumbsService.getSorterState();
    });
  }

}
