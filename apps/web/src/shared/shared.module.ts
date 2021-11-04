import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ChatService } from './services/chat.service';
import { ChatSocketService } from './services/chat.socket.service';

const matModules = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...matModules],
  providers: [ChatService, ChatSocketService],
  exports: [...matModules],
})
export class SharedModule {}
