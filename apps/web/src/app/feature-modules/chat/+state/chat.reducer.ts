import { createReducer, on, Action } from '@ngrx/store';
import * as ChatActions from './chat.actions';
import {
  IChat,
  IShortChat,
} from '../../../../../../../libs/core/src/lib/interfaces';

export const CHAT_FEATURE_KEY = 'chat';

export interface State {
  chats: IShortChat[];
  selectedChat: IChat;
  loaded: boolean;
  loading: boolean;
  error?: string | null;
}

export interface ChatPartialState {
  readonly [CHAT_FEATURE_KEY]: State;
}

const initialState: State = {
  chats: [],
  loaded: false,
  loading: false,
  selectedChat: null,
};

const chatReducer = createReducer(
  initialState,
  on(ChatActions.loadChat, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(ChatActions.loadChatSuccess, (state, { chat }) => ({
    ...state,
    selectedChat: chat,
    loaded: true,
    loading: false,
  })),
  on(ChatActions.loadChatFailure, (state, { error }) => ({ ...state, error })),
  on(ChatActions.addMessage, (state, { message }) => ({
    ...state,
    selectedChat: {
      ...state.selectedChat,
      messages: [...state.selectedChat.messages, message],
    },
  })),
  on(ChatActions.setUserChats, (state, { chats }) => ({
    ...state,
    chats,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return chatReducer(state, action);
}
