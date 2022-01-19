import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class AuthEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      mergeMap(({ userId }) =>
        this.authService.loadUser(userId).pipe(
          switchMap((user) => [AuthActions.loadUserSuccess({ user })]),
          catchError((error) => of(AuthActions.loadUserFailure({ error })))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ data }) =>
        this.authService.login(data).pipe(
          switchMap((user) => [AuthActions.loginSuccess({ user })]),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createUser),
      mergeMap(({ user }) =>
        this.authService.createUser(user).pipe(
          switchMap((user) => [AuthActions.createUserSuccess({ user })]),
          catchError((error) => of(AuthActions.createUserFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService
  ) {}
}
