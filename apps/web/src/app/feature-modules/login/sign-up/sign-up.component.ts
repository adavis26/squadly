import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CreateUserDTO } from 'libs/core/src/';
import { AuthFacade } from 'apps/web/src/store/auth/auth.facade';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public userForm: FormGroup;

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
    this.userForm = this.fb.group({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  public createUser() {
    const user: CreateUserDTO = this.userForm.value;
    this.authFacade.createUser(user);
  }
}
