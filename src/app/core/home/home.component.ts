import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('500ms ease-in', style({ opacity: '1' })),
      ])
    ]),
  ],
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

}
