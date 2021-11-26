import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { Message, MessageDTO } from 'libs/core/src/lib/interfaces';
import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  // public loaded$ = this.store.pipe(select(AuthSelectors.));

  public selectedUser$ = this.store.pipe(select(AuthSelectors.getUser));
  public selectedUserId$ = this.store.pipe(select(AuthSelectors.getUserId));

  constructor(private store: Store) {}

  public loadUser(userId: number) {
    this.store.dispatch(AuthActions.loadUser({ userId }));
  }
}
