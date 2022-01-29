import { Component, OnInit } from '@angular/core';
import { IShortChat, User } from 'libs/core/src';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { ChatFacade } from '../chat/+state/chat.facade';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CreateChatComponent } from 'apps/web/src/shared/components/create-chat/create-chat.component';
import { AuthFacade } from 'apps/web/src/store/auth/auth.facade';

@Component({
  selector: 'squadly-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public chats$: Observable<IShortChat[]>;
  public chatsSub$: Subscription;
  public user$: Observable<User>;

  constructor(
    private readonly chatFacade: ChatFacade,
    private readonly userFacade: AuthFacade,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.chats$ = this.chatFacade.chats$;
    this.user$ = this.userFacade.user$;

    this.chatsSub$ = combineLatest([this.chats$, this.user$]).subscribe(
      ([chats, user]) => {
        if (user && !chats) {
          this.chatFacade.getChatsUser(user.id);
        }
      }
    );
  }

  openCreateChatDialog(): void {
    const dialogRef = this.dialog.open(CreateChatComponent, {
      width: '250px',
    });
  }
}
