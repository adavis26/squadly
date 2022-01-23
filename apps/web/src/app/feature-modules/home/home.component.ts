import { Component, OnInit } from '@angular/core';
import { IShortChat } from 'libs/core/src';
import { Observable } from 'rxjs';
import { ChatFacade } from '../chat/+state/chat.facade';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CreateChatComponent } from 'apps/web/src/shared/components/create-chat/create-chat.component';

@Component({
  selector: 'squadly-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public chats$: Observable<IShortChat[]>;

  constructor(
    private readonly chatFacade: ChatFacade,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.chats$ = this.chatFacade.chats$;
  }

  openCreateChatDialog(): void {
    const dialogRef = this.dialog.open(CreateChatComponent, {
      width: '250px',
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.animal = result;
    // });
  }
}
