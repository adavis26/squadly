import { createAction, props } from '@ngrx/store';
import {
  Chat,
  MessageDTO,
} from '../../../../../../../libs/core/src/lib/interfaces';

export const init = createAction(
  '[Chat Page] Init',
  props<{ chatId: number }>()
);

export const loadChatSuccess = createAction(
  '[Chat] Load Chat Success',
  props<{ chat: Chat }>()
);

export const loadChatFailure = createAction(
  '[Chat] Load Chat Failure',
  props<{ error: any }>()
);

export const sendMessage = createAction(
  '[Chat] Send Message',
  props<{ message: MessageDTO }>()
);

export const sendMessageSuccess = createAction(
  '[Chat] Send Message Success',
  props<{ message: MessageDTO }>()
);

export const sendMessageFail = createAction(
  '[Chat] Send Message Success',
  props<{ error: any }>()
);
