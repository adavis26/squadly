import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';
import * as fromReducer from './reducers';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromReducer.reducers, { metaReducers: fromReducer.metaReducers })
  ]
})
export class AuthModule { }
