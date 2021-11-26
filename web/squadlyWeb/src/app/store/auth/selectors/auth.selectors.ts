import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const getAuth = createSelector(
  selectAuthState,
  (state: fromAuth.State) =>
    state.isAuthenticated
);

export const getUser = createSelector(
  selectAuthState,
  (state: fromAuth.State) =>
    state
);