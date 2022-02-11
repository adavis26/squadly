import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import {
  CreateUserDTO,
  Message,
  MessageDTO,
  User,
} from 'libs/core/src/lib/interfaces';
import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  public isAuthenticated$ = this.store.pipe(
    select(AuthSelectors.getIsAuthenticated)
  );
  public isAuthenticating$ = this.store.pipe(
    select(AuthSelectors.getIsAuthenticating)
  );

public user$ = this.store.pipe(select(AuthSelectors.getUser));
  public selectedUserId$ = this.store.pipe(select(AuthSelectors.getUserId));

  constructor(private store: Store) {}

  public setUser(user: User): void {
    this.store.dispatch(AuthActions.setUser({ user }));
  }

  public login(data: { username: string; password: string }): void {
    this.store.dispatch(AuthActions.login({ data }));
  }

  public createUser(user: CreateUserDTO): void {
    this.store.dispatch(AuthActions.createUser({ user }));
  }

  public logout(): void{
    this.store.dispatch(AuthActions.logout());
  }

  public verify(): void {
    this.store.dispatch(AuthActions.verify())
  }
}
