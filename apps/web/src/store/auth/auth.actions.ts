import { createAction, props } from '@ngrx/store';
import { User } from '../../../../../libs/core/src';

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
