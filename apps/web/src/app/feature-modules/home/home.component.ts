import { Component, OnInit } from '@angular/core';
import { IShortChat } from 'libs/core/src';
import { Observable } from 'rxjs';
import { ChatFacade } from '../chat/+state/chat.facade';

@Component({
  selector: 'squadly-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public chats$: Observable<IShortChat[]>;

  constructor(private readonly chatFacade: ChatFacade) {
    this.chats$ = this.chatFacade.chats$;
  }

  ngOnInit() {}
}
