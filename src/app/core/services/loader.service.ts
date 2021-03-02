import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading = new BehaviorSubject<boolean>(null);

  constructor() { }

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }

  loading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
}
