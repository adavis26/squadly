import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './feature-modules/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatModule } from './feature-modules/chat/chat.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpService } from '@nestjs/common';
import { SocketIoModule } from 'ngx-socket-io';
import { RouterModule } from '@angular/router';
import { AuthFacade } from '../store/auth/auth.facade';
import { AuthEffects } from '../store/auth/auth.effects';
import * as fromAuth from '../store/auth/auth.reducer';
import { LoginModule } from './feature-modules/login/login.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChatModule,
    SharedModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    SocketIoModule.forRoot({ url: environment.SOCKET_ENDPOINT, options: {} }),
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    LoginModule,
  ],
  providers: [HttpService, AuthFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
