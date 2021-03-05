import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FooterNavI } from '../../interfaces/footer-navI';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  // Animacion para el footer desplegable
  animations: [
    trigger(
      'inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('200ms ease-out',
          style({ height: 90, opacity: 1 }))]
      ),
      transition(':leave', [
        style({ height: 90, opacity: 0.3 }),
        animate('200ms ease-in',
          style({ height: 0, opacity: 0 }))]
      )]
    )
  ]
})
export class FooterComponent implements OnInit {

  footerNav: Array<FooterNavI>;

  constructor() { }

  ngOnInit(): void {
    this.footerNav = [
      { name: 'buyers', value: false },
      { name: 'aboutUs', value: false },
      { name: 'information', value: false },
      { name: 'contacts', value: false }
    ];
  }

  /**
   * Despliega la opcion indicada y oculta las demás en el footer nav
   * @param option: string
   */
  openFooterNav(option: string): void {
    this.footerNav.filter(x => {
      if (x.name === option) {
        x.value = !x.value;
      } else {
        x.value = false;
      }
    });
  }
}
