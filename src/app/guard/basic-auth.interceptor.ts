import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LoginService } from '../service/login.service';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add header with basic auth credentials if user is logged in and request is to the api url

    const user = this.loginService.currentUserValue;
    const isLoggedIn = user && user.authdata;
    if (isLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `${user.authdata}`
        }
      });
    }

    return next.handle(request);
  }
}
