import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as AuthActions from './auth.actions';
import { ChatService } from 'apps/web/src/shared/services/chat.service';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ChatSocketService } from 'apps/web/src/shared/services/chat.socket.service';
import { AuthService } from '../../shared/services/auth.service';
import * as ChatActions from '../../app/feature-modules/chat/+state/chat.actions';

@Injectable()
export class AuthEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      mergeMap(({ userId }) =>
        this.authService.loadUser(userId).pipe(
          switchMap((user) => [
            AuthActions.loadUserSuccess({ user }),
            ChatActions.setUserChats({ chats: user.chats }),
          ]),
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

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService
  ) {}
}
