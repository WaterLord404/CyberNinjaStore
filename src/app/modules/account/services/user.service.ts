import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserI } from '../interfaces/userI';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'user/';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Loguea a un usuario (devuelve un jwt en el header)
   * @param user
   */
  login(user: UserI): Observable<any> {
    return this.http.post(environment.domain + this.url + 'login', user, {observe: 'response'});
  }

  register(user: UserI): Observable<any> {
    return this.http.post(environment.domain + this.url + 'sign-up', user);
  }

}
