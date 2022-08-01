import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatFacade } from 'apps/web/src/app/feature-modules/chat/+state/chat.facade';
import { ChatComponent } from 'apps/web/src/app/feature-modules/chat/chat.component';
import { Observable, of, Subject } from 'rxjs';
import { startWith, map, debounce, debounceTime } from 'rxjs/operators';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  public addUserForm: UntypedFormGroup;
  public filteredOptions;
  public query = new FormControl();
  public subject = new Subject();

  constructor(
    public dialogRef: MatDialogRef<ChatComponent>,
    public fb: UntypedFormBuilder,
    public chatFacade: ChatFacade,
    public userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { chatId: number }
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.query.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value: string) => {
        console.log(value);
        if (value.length) {
          this.filteredOptions = this.userService.fuzzySearchUsername(value);
        }
      });
  }

  public initForm(): void {
    this.addUserForm = this.fb.group({
      query: new FormControl('', [Validators.required]),
    });
  }

  public addUser(): void {
    const userId: number = this.query.value;

    this.chatFacade.addUserToChat(this.data.chatId, userId);
    this.dialogRef.close();
  }
}
