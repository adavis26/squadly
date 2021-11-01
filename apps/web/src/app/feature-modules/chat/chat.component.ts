import { Component, OnInit } from '@angular/core';
import { ChatFacade } from './+state/chat.facade';

@Component({
  selector: 'squadly-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public messages = [];

  public chat$;

  constructor(private chatFacade: ChatFacade) {}

  ngOnInit(): void {
    this.chat$ = this.chatFacade.selectedChat$;
  }

  public getChat() {}

  public sendMessage() {}
}
