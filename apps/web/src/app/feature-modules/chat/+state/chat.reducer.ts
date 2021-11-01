import { createReducer, on, Action } from '@ngrx/store';
import * as ChatActions from './chat.actions';
import { Chat } from '../../../../../../../libs/core/src/lib/interfaces';

export const CHAT_FEATURE_KEY = 'chat';

export interface State {
  chats: Chat[];
  selectedChat?: Chat;
  loaded: boolean;
  loading: boolean;
  error?: string | null;
}

export interface ChatPartialState {
  readonly [CHAT_FEATURE_KEY]: State;
}

const initialState = {
  chats: [],
  loaded: false,
  loading: false,
};

const chatReducer = createReducer(
  initialState,
  on(ChatActions.loadChat, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(ChatActions.loadChatSuccess, (state, { chat }) => {
    console.log(chat);
    return {
      ...state,
      chats: [
        ...state.chats,
        { messages: chat.messages, members: chat.members },
      ],
      selectedChat: chat,
      loaded: true,
      loading: false,
    };
  }),
  on(ChatActions.loadChatFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return chatReducer(state, action);
}
