import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ChatFacade } from '../chat/+state/chat.facade';
import { SharedModule } from 'apps/web/src/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  providers: [ChatFacade],
})
export class HomeModule {}
