import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CHAT_FEATURE_KEY, State, ChatPartialState } from './chat.reducer';

export const getChatState = createFeatureSelector< State>(
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
  (state: State) => state.chats
);

export const getSelectedChat = createSelector(
  getChatState,
  (state: State) => state.selectedChat
);

export const getSelectedChatId = createSelector(
  getChatState,
  (state: State) => state.selectedChat?.id
);


export const getUser = createSelector(
  getChatState,
  (state: State, userId: number) =>
    state.selectedChat.members.find((user) => user.id === userId)
);
