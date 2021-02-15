import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ChatActions from './chat.actions';
import { Chat } from '../../../../../../../libs/core/src/lib/interfaces';

export const CHAT_FEATURE_KEY = 'chat';

export interface State extends Chat {
  selectedId?: string | number; // which Chat record has been selected
  loaded: boolean; // has the Chat list been loaded
  error?: string | null; // last known error (if any)
}

export interface ChatPartialState {
  readonly [CHAT_FEATURE_KEY]: State;
}

const initialState = {
  loaded: false,
  messages: [],
  members: []
}

const chatReducer = createReducer(
  initialState,
  on(ChatActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(ChatActions.loadChatSuccess, (state, { chat }) => ({
    ...state,
    messages: chat.messages,
    members: chat.members,
  })),
  on(ChatActions.loadChatFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return chatReducer(state, action);
}
