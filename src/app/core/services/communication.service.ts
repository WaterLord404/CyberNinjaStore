import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HeaderComponent } from '../header/header.component';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor() { }

  // Observable string sources
  private componentCall = new Subject<string>();

  // Observable string streams
  componentCalled = this.componentCall.asObservable();

  /**
   * Recibe la llamada del emisor
   */
  callComponentMethod(option: string) {
    this.componentCall.next(option);
  }
}
