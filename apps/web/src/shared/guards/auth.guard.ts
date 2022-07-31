import { Router } from '@angular/router';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthFacade } from '../../store/auth/auth.facade';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly authFacade: AuthFacade
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.authFacade.user$.pipe(
      map((user) => {
        if (!this.authService.validateLocalToken()) {
          this.router.navigate(['login']);
          return false;
        }

        if (!user) {
          this.authFacade.verify();
        }

        return true;
      })
    );
  }
}
