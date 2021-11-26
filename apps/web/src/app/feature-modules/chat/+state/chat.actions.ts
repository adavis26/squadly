import { createAction, props } from '@ngrx/store';
import {
  IChat,
  IShortChat,
  Message,
  MessageDTO,
} from '../../../../../../../libs/core/src/';

export const loadChat = createAction(
  '[Chat Page] Load Chat',
  props<{ chatId: number }>()
);

export const loadChatSuccess = createAction(
  '[Chat] Load Chat Success',
  props<{ chat: IChat }>()
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
  '[Chat] Send Message Fail',
  props<{ error: any }>()
);

export const addMessage = createAction(
  '[Chat] Add Message',
  props<{ message: Message }>()
);

export const setUserChats = createAction(
  '[Chat] Set User Chats',
  props<{ chats: IShortChat[] }>()
);
