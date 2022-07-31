import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CreateUserDTO } from 'libs/core/src/';
import { AuthFacade } from 'apps/web/src/store/auth/auth.facade';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public userForm: UntypedFormGroup;

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly fb: UntypedFormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
    this.userForm = this.fb.group({
      firstName: new UntypedFormControl(),
      lastName: new UntypedFormControl(),
      email: new UntypedFormControl(),
      username: new UntypedFormControl(),
      password: new UntypedFormControl(),
    });
  }

  public createUser() {
    const user: CreateUserDTO = this.userForm.value;
    this.authFacade.createUser(user);
  }
}
