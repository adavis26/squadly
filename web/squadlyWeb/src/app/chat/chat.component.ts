import { Component, OnInit, HostListener, ViewChildren, ViewChild, ElementRef, AfterViewChecked, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { IMessage } from '../../shared/models/message.interface';
import { Store, props } from '@ngrx/store';
import * as fromAuth from '../store/auth/reducers/auth.reducer';
import * as fromMessaging from '../store/messaging/reducers/messaging.reducer';
import * as messagingActions from '../store/messaging/actions/messaging.actions'
import * as authSelectors from '../store/auth/selectors/auth.selectors';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy, OnChanges {

  public chatID: string;

  public user$;
  public user;

  public messages$;
  public messages;

  public windowHeight;

  constructor(
    private route: ActivatedRoute,
    private authStore: Store<fromAuth.State>,
    private messagingStore: Store<fromMessaging.State>) {
    this.user$ = this.authStore.select(authSelectors.getUser);
    this.user$.subscribe(data => {
      console.log(data);
      this.user = data;
    });
  }

  @HostListener('window:resize', ['$event'])
  @HostListener('document:keypress', ['$event'])
  @ViewChild('message', { static: false }) messageInput: ElementRef;
  @ViewChild('messageContainer', { static: false }) messageContainer: ElementRef;

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      const msg = this.messageInput.nativeElement.value;
      this.submit(msg);
    }
  }

  onResize(event) {
    this.windowHeight = window.outerHeight - 300;
  }

  ngOnInit() {
    this.windowHeight = window.outerHeight - 300;

    this.route.params.subscribe(params => {
      this.chatID = params.chat_id;
    });

    // if (this.chatID) {
    //   this.messagingStore.dispatch(messagingActions.LoadChat({ chatID: this.chatID }));
    // }

    this.scrollToBottom();
  }

  ngOnChanges(): void {
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }


  public submit(msg) {

    const message: IMessage = {
      message_type: 'text',
      message_content: msg,
      sender_username: this.user.username,
      sender_id: '',
      user_color: '#DBDBDB',
      chat_id: this.chatID
    };

    const response$ = "";
    if (response$) {
      console.log("message sent");
    }
    else {
      console.log("failed to send message")
    }
    this.messageInput.nativeElement.value = '';
  }

  ngOnDestroy() {
    // this.messages$.unsubscribe();
  }
}

