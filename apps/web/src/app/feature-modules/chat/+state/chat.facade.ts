import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { MessageDTO } from 'libs/core/src/lib/interfaces';
import * as ChatActions from './chat.actions';
import * as ChatSelectors from './chat.selectors';

@Injectable()
export class ChatFacade {
  loaded$ = this.store.pipe(select(ChatSelectors.getChatLoaded));
  // allChat$ = this.store.pipe(select(ChatSelectors.getSelectedChat));

  selectedChat$ = () => this.store.pipe(select(ChatSelectors.getSelectedChat));

  constructor(private store: Store) {}

  public loadChat(chatId) {
    this.store.dispatch(ChatActions.loadChat({ chatId }));
  }

  public sendChat(message: MessageDTO) {
    this.store.dispatch(ChatActions.sendMessage({ message }));
  }
}
