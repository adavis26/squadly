import { state } from '@angular/animations';
import { createReducer, on, Action } from '@ngrx/store';
import { User } from 'libs/core/src';
import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  user: User;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  error?: any;
}

export interface ChatPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
  isAuthenticating: false,
};

const chatReducer = createReducer(
  initialState,
  on(AuthActions.setUser, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.login, (state) => ({
    ...state,
    isAuthenticating: true,
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    isAuthenticating: false,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    isAuthenticated: false,
    isAuthenticating: false,
  })),
  on(AuthActions.logout, () => initialState),
  on(AuthActions.verifySuccess, (state, { user }) => ({
    ...state,
    isAuthenticating: true,
  })),
  on(AuthActions.verifySuccess, (state, { user }) => ({
    ...state,
    isAuthenticating: false,
    isAuthenticated: true,
    user,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return chatReducer(state, action);
}
