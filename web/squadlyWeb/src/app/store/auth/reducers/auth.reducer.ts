import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  username: string;
  isAuthenticated: boolean;
}

export const initialState: State = {
  username: '',
  isAuthenticated: false
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.loadAuths, state => state),
  on(AuthActions.loadAuthsSuccess, (state, action) => state),
  on(AuthActions.loadAuthsFailure, (state, action) => state),
  on(AuthActions.setAuth, (state, action) => state),
  on(AuthActions.setAuthSuccess,
    (state, action) => {
      return {
        ...state,
        username: action.data.username,
        isAuthenticated: true
      }
    }),
  on(AuthActions.logout,
    (state, action) => {
      return {
        ...state,
        username: null,
        isAuthenticated: false
      }
    })
);

export function reducer(state: State, action: Action) {
  return authReducer(state, action);
}
