import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserI } from 'src/app/modules/account/interfaces/userI';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isLogin = new BehaviorSubject<boolean>(this.hasToken());
  private customer = new BehaviorSubject<UserI>(null);

  /**
   * if we have token the user is loggedIn
   * @returns: boolean
   */
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Get logged customer
   * @returns: {Observable<UserI>}
   */
  getCustomer(): Observable<UserI> {
    return this.customer.asObservable();
  }

  /**
   * Get login status
   * @returns: {Observable<boolean>}
   */
  isLoggedIn(): Observable<boolean> {
    return this.isLogin.asObservable();
  }

  /**
   * Login the user then tell all the subscribers about the new status
   */
  login(customer: UserI, jwt: string): void {
    localStorage.setItem('token', jwt);
    this.customer.next(customer);
    this.isLogin.next(true);
  }

  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout(): void {
    localStorage.removeItem('token');
    this.customer.next(null);
    this.isLogin.next(false);
  }

  /**
   * Get rol of user
   * @returns boolean
   */
  isAdmin(): boolean {
    const jwt: string = localStorage.getItem('token');
    if (jwt == null) { return; }

    const jwtData = jwt.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);
    const role = decodedJwtData.role;

    return role[0] === 'ADMIN';
  }
}
