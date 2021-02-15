import { createAction, props } from '@ngrx/store';
import { Chat } from '../../../../../../../libs/core/src/lib/interfaces';

export const init = createAction('[Chat Page] Init');

export const loadChatSuccess = createAction(
  '[Chat/API] Load Chat Success',
  props<{ chat: Chat }>()
);

export const loadChatFailure = createAction(
  '[Chat/API] Load Chat Failure',
  props<{ error: any }>()
);
