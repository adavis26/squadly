import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../../../../libs/core/src/';
import { ChatSocketService } from '../shared/services/chat.socket.service';

@Component({
  selector: 'squadly-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly socketService: ChatSocketService) {}
}
