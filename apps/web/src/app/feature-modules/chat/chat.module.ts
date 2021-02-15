import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromChat from './+state/chat.reducer';
import { ChatEffects } from './+state/chat.effects';
import { ChatFacade } from './+state/chat.facade';
import { HttpService } from '@nestjs/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(fromChat.CHAT_FEATURE_KEY, fromChat.reducer),
    EffectsModule.forFeature([ChatEffects]),
    HttpClientModule
  ],
  providers: [ChatFacade],
})
export class ChatModule {}
