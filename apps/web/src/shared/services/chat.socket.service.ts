import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MESSAGE, MessageDTO } from '../../../../../libs/core/src';
import { ChatFacade } from '../../app/feature-modules/chat/+state/chat.facade';
import { Message } from '../../../../../libs/core/src';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class ChatSocketService {
  constructor(
    private readonly chatFacade: ChatFacade,
    private readonly socket: Socket
  ) {
    this.listeners();
  }

  public listeners(): void {
    this.socket.on(MESSAGE.RECIEVE, (message: Message) => {
      this.chatFacade.addMessage(message);
    });
  }

  public sendMessage(message: MessageDTO): void {
    this.socket.emit(MESSAGE.SEND, message);
  }
}
