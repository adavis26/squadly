import { Router } from '@angular/router';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.authService.validate()) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
