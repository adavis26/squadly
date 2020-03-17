import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import * as fromMessaging from './messaging.reducer';

export interface State {
  auth: fromMessaging.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromMessaging.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
