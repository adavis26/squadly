import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromAuth from './auth/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth.effects';
import { AuthFacade } from './auth/auth.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer)
  ],
  declarations: [],
  providers: [AuthFacade]
})
export class GlobalStoreModule {}
