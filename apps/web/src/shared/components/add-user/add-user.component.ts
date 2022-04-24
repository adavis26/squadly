import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatFacade } from 'apps/web/src/app/feature-modules/chat/+state/chat.facade';
import { ChatComponent } from 'apps/web/src/app/feature-modules/chat/chat.component';
import { CreateChatDTO } from 'libs/core/src';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  public addUserForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ChatComponent>,
    public fb: FormBuilder,
    public chatFacade: ChatFacade,
    @Inject(MAT_DIALOG_DATA) public data: { chatId: number }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addUserForm = this.fb.group({
      userId: new FormControl('', [Validators.required]),
    });
  }

  public addUser(): void {
    const userId: number = this.addUserForm.controls.userId.value;

    this.chatFacade.addUserToChat(this.data.chatId, userId);
    this.dialogRef.close();
  }
}
