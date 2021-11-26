import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, State, ChatPartialState } from './auth.reducer';

export const getAuthState = createFeatureSelector<ChatPartialState, State>(
  AUTH_FEATURE_KEY
);

export const getUser = createSelector(
  getAuthState,
  (state: State) => state.user
);

export const getUserId = createSelector(
  getAuthState,
  (state: State) => state.user.id
);


export const getUserError = createSelector(
  getAuthState,
  (state: State) => state.error
);
