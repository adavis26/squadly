import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IChat } from 'libs/core/src';
import { Observable, Subscription } from 'rxjs';
import { ChatFacade } from './+state/chat.facade';

@Component({
  selector: 'squadly-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  public chat$: Observable<IChat>;
  public content: string = '';

  public currentUserId: number = 1;

  @ViewChild('messageContainer', { read: ElementRef })
  messageContainer: ElementRef;
  public chatSub$: Subscription;

  constructor(private chatFacade: ChatFacade) {}

  ngOnInit(): void {
    this.chat$ = this.chatFacade.selectedChat$;

    this.chatSub$ = this.chat$.subscribe((_chat) => {
      if (_chat?.messages.length) {
        this.autoScroll();
      }
    });
  }

  public autoScroll(): void {
    setTimeout(() => {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    }, 10);
  }

  public sendMessage() {
    this.chatFacade.sendMessage({
      userId: 1,
      chatId: 1,
      content: this.content,
    });

    this.content = '';
  }

  ngOnDestroy() {
    this.chatSub$.unsubscribe();
  }
}
