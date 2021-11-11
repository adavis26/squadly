import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../../../../libs/core/src/';
import { ChatSocketService } from '../shared/services/chat.socket.service';

@Component({
  selector: 'squadly-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public windowHeight: number;

  constructor(private readonly socketService: ChatSocketService) {
    this.windowHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowHeight = window.innerHeight;
  }
}
