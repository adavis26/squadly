import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { Message, MessageDTO } from 'libs/core/src/lib/interfaces';
import * as ChatActions from './chat.actions';
import * as ChatSelectors from './chat.selectors';

@Injectable()
export class ChatFacade {
  public loaded$ = this.store.pipe(select(ChatSelectors.getChatLoaded));
  // allChat$ = this.store.pipe(select(ChatSelectors.getSelectedChat));

  public selectedChat$ = this.store.pipe(select(ChatSelectors.getSelectedChat));

  constructor(private store: Store) {}

  public loadChat(chatId) {
    this.store.dispatch(ChatActions.loadChat({ chatId }));
  }

  public sendMessage(message: MessageDTO) {
    this.store.dispatch(ChatActions.sendMessage({ message }));
  }

  public addMessage(message: Message) {
    this.store.dispatch(ChatActions.addMessage({ message }));
  }
}
