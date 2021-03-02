import { ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { BreadCrumbsI } from './Interfaces/bread-crumbsI';
import { BreadCrumbsService } from './services/bread-crumbs.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: []
})
export class ProductComponent implements OnInit {

  breadCrumbs: Array<BreadCrumbsI>;
  activeFilter = true;

  constructor(
    private cd: ChangeDetectorRef,
    private breadCrumbsService: BreadCrumbsService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Actualiza las migas de pan
   * @param EventEmitter<string>
   */
  updateLocation(event: EventEmitter<string>): void {
    event.subscribe(res => {
      this.breadCrumbs = this.breadCrumbsService.updateBreadCrumbs(res);
      this.activeFilter = false;
    });
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
