import { Action, createReducer, on } from '@ngrx/store';
import * as MessagingActions from '../actions/messaging.actions';
import { IMessage } from 'src/shared/models/message.interface';
import { IChat } from 'src/shared/models/chat.interface';

export const messagingFeatureKey = 'messaging';

export interface State {
  chats: IChat[]
}

export const initialState: State = {
  chats: []
};

const messagingReducer = createReducer(
  initialState,
  on(
    MessagingActions.LoadChat,
    state => state
  ),
  on(
    MessagingActions.LoadChatSuccess,
    (state, { data }) => (
      {
        ...state,
        chats: data
      }
    )
  ),
  on(
    MessagingActions.LoadChatFailure,
    (state, action) => state)
  ,
  on(
    MessagingActions.LoadChats,
    state => state
  ),
  on(
    MessagingActions.LoadChatsSuccess,
    (state, { data }) => (
      {
        ...state,
        chats: data
      }
    )
  ),
  on(
    MessagingActions.LoadChatsFailure,
    (state, action) => state)
  ,
  on(
    MessagingActions.UpdateChat,
    (state, { messages }) => (
      {
        ...state,
        chats: messages
      }
    )
  ));

export function reducer(state: State | undefined, action: Action) {
  return messagingReducer(state, action);
}
