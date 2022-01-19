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
  on(AuthActions.loadUser, (state) => ({
    ...state
  })),
  on(AuthActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error,
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
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return chatReducer(state, action);
}
