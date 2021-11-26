import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMessaging from '../reducers/messaging.reducer';

export const selectMessagingState = createFeatureSelector<fromMessaging.State>(
  fromMessaging.messagingFeatureKey
);

export const getChats = createSelector(
  selectMessagingState,
  (state) => state.chats
);
