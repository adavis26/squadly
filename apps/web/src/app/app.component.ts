import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../../../../libs/core/src/';
import { ChatSocketService } from '../shared/services/chat.socket.service';
import { AuthFacade } from '../store/auth/auth.facade';

@Component({
  selector: 'squadly-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public windowHeight: number;

  constructor(
    private readonly socketService: ChatSocketService,
    private readonly authFacade: AuthFacade
  ) {
    this.windowHeight = window.innerHeight;
  }

  ngOnInit() {
    this.authFacade.loadUser(1);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowHeight = window.innerHeight;
  }
}
