import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import * as ChatActions from '../../app/feature-modules/chat/+state/chat.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ data }) =>
        this.authService.login(data).pipe(
          switchMap((user) => [
            AuthActions.loginSuccess({ user }),
            AuthActions.setUser({ user }),
            ChatActions.setUserChats({ chats: user.chats }),
          ]),
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

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createUser),
      mergeMap(({ user }) =>
        this.authService.logout().pipe(
          switchMap(() => []),
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService
  ) {}
}
