import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import {
  Message,
  MessageDTO,
  CreateChatDTO,
} from 'libs/core/src/lib/interfaces';
import * as ChatActions from './chat.actions';
import * as ChatSelectors from './chat.selectors';

@Injectable()
export class ChatFacade {
  public loaded$ = this.store.pipe(select(ChatSelectors.getChatLoaded));
  // allChat$ = this.store.pipe(select(ChatSelectors.getSelectedChat));

  public selectedChat$ = this.store.pipe(select(ChatSelectors.getSelectedChat));
  public selectedChatId$ = this.store.pipe(
    select(ChatSelectors.getSelectedChatId)
  );

  public chats$ = this.store.pipe(select(ChatSelectors.selectChats));

  public getUser$ = (userId: number) =>
    this.store.pipe(select(ChatSelectors.getUser, userId));

  constructor(private store: Store) {}

  public loadChat(chatId): void {
    this.store.dispatch(ChatActions.loadChat({ chatId }));
  }

  public joinChat(chatId: number, userId: number): void {
    this.store.dispatch(ChatActions.joinChat({ chatId, userId }));
  }

  public sendMessage(content: string): void {
    this.store.dispatch(ChatActions.sendMessage({ content }));
  }

  public addMessage(message: Message): void {
    this.store.dispatch(ChatActions.addMessage({ message }));
  }

  public createChat(chat: CreateChatDTO): void {
    this.store.dispatch(ChatActions.createChat({ chat }));
  }

  public getChatsUser(userId: number): void {
    this.store.dispatch(ChatActions.getChatsUser({ userId }));
  }

  public deleteChat(chatId: number): void {
    this.store.dispatch(ChatActions.deleteChat({ chatId }));
  }

  public addUserToChat(chatId: number, userId: number): void {
    this.store.dispatch(ChatActions.addUserToChat({chatId, userId}))
  }
}
