import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { CreateUserDTO, Message, MessageDTO } from 'libs/core/src/lib/interfaces';
import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  public isAuthenticated$ = this.store.pipe(select(AuthSelectors.getIsAuthenticated));
  public isAuthenticating$ = this.store.pipe(select(AuthSelectors.getIsAuthenticating));

  public selectedUser$ = this.store.pipe(select(AuthSelectors.getUser));
  public selectedUserId$ = this.store.pipe(select(AuthSelectors.getUserId));


  constructor(private store: Store) {}

  public loadUser(userId: number) {
    this.store.dispatch(AuthActions.loadUser({ userId }));
  }

  public login(data: { username: string; password: string }) {
    this.store.dispatch(AuthActions.login({ data }));
  }

  public createUser(user: CreateUserDTO) {
    this.store.dispatch(AuthActions.createUser({ user }));
  }
}
