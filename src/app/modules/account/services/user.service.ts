import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserI } from '../interfaces/userI';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'user';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Loguea a un usuario (devuelve un jwt en el header)
   * @param user
   */
  login(user: UserI): Observable<any> {
    return this.http.post(this.url + '/login', user, { observe: 'response' });
  }

  register(user: UserI): Observable<any> {
    return this.http.post(this.url + '/sign-up', user);
  }

  /**
   * Confirma la cuenta del usuario
   */
  confirmAccount(token: string): Observable<any> {
    return this.http.put(this.url + '/confirm-account?token=' + token, null);
  }

}
