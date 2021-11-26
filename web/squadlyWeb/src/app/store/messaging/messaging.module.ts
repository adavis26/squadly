import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromMessaging from './reducers/messaging.reducer';
import * as fromReducer from './reducers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromMessaging.messagingFeatureKey, fromReducer.reducers, { metaReducers: fromReducer.metaReducers })
  ]
})
export class AuthModule { }
