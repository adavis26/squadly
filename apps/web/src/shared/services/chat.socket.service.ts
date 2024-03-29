import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { CHAT, IChat, MESSAGE, MessageDTO } from '../../../../../libs/core/src';
import { ChatFacade } from '../../app/feature-modules/chat/+state/chat.facade';
import { Message } from '../../../../../libs/core/src';
import { Socket } from 'ngx-socket-io';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { AuthFacade } from '../../store/auth/auth.facade';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatSocketService implements OnDestroy {
  public userId$: Observable<number>;
  public chat$: Observable<IChat>;
  public sub$: Subscription;

  constructor(
    private readonly chatFacade: ChatFacade,
    private readonly authFacade: AuthFacade,
    private readonly socket: Socket
  ) {
    this.listeners();

    this.chat$ = this.chatFacade.selectedChat$;
    this.userId$ = this.authFacade.selectedUserId$;
  }

  ngOnDestroy() {}

  public listeners(): void {
    this.socket.on(MESSAGE.RECIEVE, (message: Message) => {
      this.chatFacade.addMessage(message);
    });
  }

  public joinChat(chatId: number, userId: number): void {
    console.log('joining', chatId, 'with', userId);
    this.socket.emit(CHAT.JOIN, { userId, chatId });
  }

  public sendMessage(content: string): void {
    this.sub$ = combineLatest([this.chat$, this.userId$])
      .pipe(take(1))
      .subscribe(([chat, userId]) => {
        this.socket.emit(MESSAGE.SEND, {
          content,
          userId,
          chatId: chat.id,
        } as MessageDTO);
      });
  }
}
