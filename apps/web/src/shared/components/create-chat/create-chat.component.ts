import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatFacade } from 'apps/web/src/app/feature-modules/chat/+state/chat.facade';
import { HomeComponent } from 'apps/web/src/app/feature-modules/home/home.component';
import { CreateChatDTO } from 'libs/core/src';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.scss'],
})
export class CreateChatComponent implements OnInit {
  public createChatForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<HomeComponent>, // @Inject(MAT_DIALOG_DATA) public data: DialogData
    public fb: UntypedFormBuilder,
    public chatFacade: ChatFacade
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.createChatForm = this.fb.group({
      name: new UntypedFormControl('', [Validators.required]),
    });
  }

  public createChat(): void {
    const chat: CreateChatDTO = {
      name: this.createChatForm.controls.name.value,
    };

    this.chatFacade.createChat(chat);
    this.dialogRef.close();
  }
}
