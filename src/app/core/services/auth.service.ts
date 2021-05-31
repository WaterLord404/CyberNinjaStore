import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserI } from 'src/app/modules/account/interfaces/userI';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private isLogged = new BehaviorSubject<boolean>(this.hasToken());
  user: UserI;

  /**
   * if we have token the user is loggedIn
   * @returns: boolean
   */
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * get logged customer
   * @returns UserI
   */
  getUser(): UserI {
    let user: UserI = null;

    const jwt: string = localStorage.getItem('token');
    if (jwt === null) { return; }

    const jwtData: any = jwt_decode(jwt);
    user = jwtData.user;

    return user;
  }

  /**
   * Get login status
   * @returns boolean
   */
  isLoggedIn(): boolean {
    let status = false;
    this.isLogged.asObservable().subscribe(res => status = res);
    return status;
  }

  /**
   * Login the user then tell all the subscribers about the new status
   */
  login(jwt: string): void {
    localStorage.setItem('token', jwt);
    this.isLogged.next(true);
  }

  /**
   * Log out the user then tell all the subscribers about the new status
   */
  logout(): void {
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }

  /**
   * Get rol of user
   * @returns boolean
   */
  isAdmin(): boolean {
    let isAdmin = false;

    const jwt: string = localStorage.getItem('token');
    if (jwt === null) { return isAdmin; }

    const jwtData: any = jwt_decode(jwt);
    const role = jwtData.role;

    role.forEach(element => {
      if (element === 'ADMIN') {
        isAdmin = true;
      }
    });

    return isAdmin;
  }
}
