import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFacade } from '../../store/auth/auth.facade';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private readonly authFacade: AuthFacade) {}
  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('access_token');

    if (authToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
