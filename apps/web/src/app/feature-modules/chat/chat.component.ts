import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthFacade } from 'apps/web/src/store/auth/auth.facade';
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
  public chatId: number;
  public screenHeight: number;

  @ViewChild('messageContainer', { read: ElementRef })
  public messageContainer: ElementRef;
  public chatSub$: Subscription;
  public selectedUserId$: Observable<number>;

  public chatForm: FormGroup;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenHeight = window.innerHeight;
  }

  constructor(
    private chatFacade: ChatFacade,
    private authFacade: AuthFacade,
    private readonly fb: FormBuilder
  ) {
    this.screenHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.chat$ = this.chatFacade.selectedChat$;
    this.selectedUserId$ = this.authFacade.selectedUserId$;

    this.chatSub$ = this.chat$.subscribe((_chat) => {
      if (_chat?.messages.length) {
        this.autoScroll();
      }
    });

    this.chatForm = this.fb.group({
      content: new FormControl('', [Validators.required]),
    });
  }

  public autoScroll(): void {
    setTimeout(() => {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    }, 10);
  }

  public sendMessage() {
    this.chatFacade.sendMessage(this.chatForm.controls.content.value);
    this.chatForm.controls.content.setValue('');
  }

  ngOnDestroy() {
    this.chatSub$.unsubscribe();
  }
}
