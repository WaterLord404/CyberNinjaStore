import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService
  ) { }

  /**
   * Intercepta la petición, le añade el jwt
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    const token: string = localStorage.getItem('token');
    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: token
        }
      });
    }


    return next.handle(request).pipe(
      finalize(() => this.loaderService.hide()));
  }
}
