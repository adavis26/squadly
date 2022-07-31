import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from 'apps/web/src/shared/shared.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { GlobalStoreModule } from 'apps/web/src/store/global-store.module';
import { AuthEffects } from 'apps/web/src/store/auth/auth.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule, GlobalStoreModule],
  declarations: [LoginComponent, SignUpComponent],
})
export class LoginModule {}
