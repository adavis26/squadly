import { createAction, props } from '@ngrx/store';

export const LoadChat = createAction(
  '[Messaging] Load Messagings',
  props<{chatID: string}>()
);

export const LoadChatSuccess = createAction(
  '[Messaging] Load Messagings Success',
  props<{ data: any }>()
);

export const LoadChatFailure = createAction(
  '[Messaging] Load Chat Failure',
  props<{ error: any }>()
);

export const LoadChats = createAction(
  '[Messaging] Load Messagings',
  props<{squadID: string}>()
);

export const LoadChatsSuccess = createAction(
  '[Messaging] Load Messagings Success',
  props<{ data: any }>()
);

export const LoadChatsFailure = createAction(
  '[Messaging] Load Chat Failure',
  props<{ error: any }>()
);

export const SendMessage = createAction(
  '[Messaging] Send Message',
  props<{chatID: string, message: string}>()
);

export const SendMessageSuccess = createAction(
  '[Messaging] Send Message Success',
  props<{ response: any }>()
);

export const SendMessageFail= createAction(
  '[Messaging] Send Message Fail',
  props<{ error: any }>()
);


export const UpdateChat= createAction(
  '[Messaging] Send Message Fail',
  props<{ messages: any }>()
);



