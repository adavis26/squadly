import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CHAT_FEATURE_KEY, State, ChatPartialState } from './chat.reducer';

export const getChatState = createFeatureSelector<ChatPartialState, State>(
  CHAT_FEATURE_KEY
);

export const getChatLoaded = createSelector(
  getChatState,
  (state: State) => state.loaded
);

export const getChatError = createSelector(
  getChatState,
  (state: State) => state.error
);

export const selectChats = createSelector(
  getChatState,
  (state: State, chatId: number) => {}
);

export const getSelectedChat = createSelector(
  getChatState,
  (state: State, chatId: number) => state.selectedChat
);
