import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { AuthService } from 'src/shared/services/auth.service';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { AttachSession } from 'protractor/built/driverProviders';



@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(ofType(AuthActions.setAuth),
    switchMap(auth =>
      this.AuthService.login(auth)
        .pipe(map(user => AuthActions.setAuthSuccess({ data: { username: auth.data.username } }),
          tap(data => console.log(data))
        ))
    )
  );
  // ,catch(error => of(AuthActions.setAuthFailure(error))

  // loadAuths$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(AuthActions.loadAuths),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */

  //       this.AuthService.login({}).pipe(
  //         map(data => AuthActions.loadAuthsSuccess({ data })),
  //         catchError(error => of(AuthActions.loadAuthsFailure({ error }))))
  //     )
  //   );
  // });

  setAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadAuths),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => AuthActions.setAuth(data)),
          catchError(error => of(AuthActions.loadAuthsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions, private AuthService: AuthService) { }

}
