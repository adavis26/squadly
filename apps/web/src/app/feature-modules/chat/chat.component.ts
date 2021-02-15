import { Component, OnInit } from '@angular/core';
import { ChatFacade } from './+state/chat.facade';

@Component({
  selector: 'squadly-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public messages = [
    {
      msg: 'Test Message',
      uid: 1,
    },
    {
      msg: 'Another Message',
      uid: 2,
    },
  ];

  public chat$ = this.chatFacade.allChat$;

  constructor(private chatFacade: ChatFacade) {}

  ngOnInit(): void {
    this.chatFacade.init();
  }

  public sendMessage() {}
}
