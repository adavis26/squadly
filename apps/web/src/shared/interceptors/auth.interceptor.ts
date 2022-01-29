import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthFacade } from '../../store/auth/auth.facade';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private readonly authFacade: AuthFacade,
    private readonly router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('access_token');

    if (authToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken),
      });
      return next.handle(cloned).pipe(
        tap(
          () => {},
          (err: any) => {
            this.handleLogout(err);
          }
        )
      );
    } else {
      return next.handle(req);
    }
  }

  private handleLogout(err: any) {
    if (err instanceof HttpErrorResponse) {
      if (err.status !== 401) {
        return;
      }
      this.authFacade.logout();
      this.router.navigate(['login']);
    }
  }
}
