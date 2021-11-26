import { createAction, props } from '@ngrx/store';

export const loadAuths = createAction(
  '[Auth] Load Auths'
);

export const loadAuthsSuccess = createAction(
  '[Auth] Load Auths Success',
  props<{ data: any }>()
);

export const loadAuthsFailure = createAction(
  '[Auth] Load Auths Failure',
  props<{ error: any }>()
);

export const setAuth = createAction(
  '[Auth] Set Auth',
  props<{ data: any }>()
);

export const setAuthSuccess = createAction(
  '[Auth] Set Auth Success',
  props<{ data: any }>()
);

export const setAuthFailure = createAction(
  '[Auth] Set Auth Failure',
  props<{ data: any }>()
);

export const logout = createAction(
  '[Auth] Logout'
);
