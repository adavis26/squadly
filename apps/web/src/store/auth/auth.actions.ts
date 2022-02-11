import { createAction, props } from '@ngrx/store';
import { CreateUserDTO, User } from '../../../../../libs/core/src';

export const setUser = createAction(
  '[Auth] Load User',
  props<{ user: User }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ data: { username: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const createUser = createAction(
  '[Auth] Create User',
  props<{ user: CreateUserDTO }>()
);

export const createUserSuccess = createAction(
  '[Auth] Create User Success',
  props<{ user: User }>()
);

export const createUserFailure = createAction(
  '[Auth] Create User Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');

export const verify = createAction('[Auth] Verify');

export const verifySuccess = createAction(
  '[Auth] Verify Success',
  props<{ user: User }>()
);

export const verifyFailure = createAction(
  '[Auth] Verify Failure',
  props<{ error: any }>()
);
