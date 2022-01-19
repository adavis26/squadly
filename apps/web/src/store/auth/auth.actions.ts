import { createAction, props } from '@ngrx/store';
import { CreateUserDTO, User } from '../../../../../libs/core/src';

export const loadUser = createAction(
  '[Auth] Load User',
  props<{ userId: number }>()
);

export const loadUserSuccess = createAction(
  '[Chat] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[Chat] Load User Failure',
  props<{ error: any }>()
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
