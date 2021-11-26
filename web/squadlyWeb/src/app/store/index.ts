import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './auth/reducers/auth.reducer';
import * as fromMessaging from './messaging/reducers/messaging.reducer';


export interface State {
  auth: fromAuth.State;
  messaging: fromMessaging.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  messaging: fromMessaging.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
