import { createAction, props } from '@ngrx/store';
import {
  CreateChatDTO,
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

export const joinChat = createAction(
  '[Chat] Join Chat',
  props<{ chatId: number; userId: number }>()
);

export const joinChatSuccess = createAction('[Chat] Join Chat Success');

export const joinChatFail = createAction(
  '[Chat] Join Chat Fail',
  props<{ error: any }>()
);

export const sendMessage = createAction(
  '[Chat] Send Message',
  props<{ content: string }>()
);

export const sendMessageSuccess = createAction('[Chat] Send Message Success');

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

export const createChat = createAction(
  '[Chat] Create Chat',
  props<{ chat: CreateChatDTO }>()
);

export const createChatSuccess = createAction(
  '[Chat] Set User Chats',
  props<{ chat: IShortChat }>()
);

export const createChatFail = createAction(
  '[Chat] Set User Chats',
  props<{ error: any }>()
);

export const getChatsUser = createAction(
  '[Chat] Get Chats User',
  props<{ userId: number }>()
);

export const getChatsUserSuccess = createAction(
  '[Chat] Get Chats User Success',
  props<{ chats: IShortChat[] }>()
);

export const getChatsUserFail = createAction(
  '[Chat] Get Chats User Failure',
  props<{ error: any }>()
);

export const deleteChat = createAction(
  '[Chat] Delete Chat',
  props<{ chatId: number }>()
);

export const deleteChatSuccess = createAction(
  '[Chat] Delete Chat Success',
  props<{ chatId: number }>()
);

export const deleteChatFail = createAction(
  '[Chat] Delete Chat Failure',
  props<{ error: any }>()
);

