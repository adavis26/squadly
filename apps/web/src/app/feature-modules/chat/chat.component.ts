import { Component, OnInit } from '@angular/core';
import { ChatFacade } from './+state/chat.facade';

@Component({
  selector: 'squadly-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public chat$;
  public content: string = '';

  constructor(private chatFacade: ChatFacade) {}

  ngOnInit(): void {
    this.chat$ = this.chatFacade.selectedChat$;
  }

  public sendMessage() {
    this.chatFacade.sendMessage({
      userId: 1,
      chatId: 1,
      content: this.content,
    });

    this.content = '';
  }
}
