import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatCardComponent } from './home/chat-card/chat-card.component';
import { SquadComponent } from './home/squad/squad.component';
import { FeedComponent } from './home/feed/feed.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './chat/message/message.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'node_modules/ngx-socket-io';
import { NewUserComponent } from './login/new-user/new-user.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NavComponent } from './shared/nav/nav.component';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthEffects } from './store/auth/effects/auth.effects';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as ENV from '../environments/environment';
import { MessagingEffects } from './store/messaging/effects/messaging.effects';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatCardComponent,
    SquadComponent,
    FeedComponent,
    ChatComponent,
    MessageComponent,
    NewUserComponent,
    LoginComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    SocketIoModule.forRoot(ENV.environment.socketConfig),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([
      AuthEffects,
      MessagingEffects
    ]),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
