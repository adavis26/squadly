import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  newUserForm;

  constructor(
    private fb: FormBuilder,
    private us: UserService,
    private toastr: ToastrService
  ) {
    this.newUserForm = this.fb.group({
      username: ''
    });
  }


  ngOnInit() {
  }

  public submit() {
    const user = this.newUserForm.value;
    this.us.newUser(user);
    this.toastr.success(`{user.username} added`);
  }

}
