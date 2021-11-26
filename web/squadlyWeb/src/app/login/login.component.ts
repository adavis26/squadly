import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuth from '../store/auth/reducers';
import * as authActions from '../store/auth/actions/auth.actions'
import * as authSelectors from '../store/auth/selectors/auth.selectors';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm;

  constructor(private fb: FormBuilder, private store: Store<fromAuth.State>, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public submit() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      console.log(user);
      this.store.dispatch(authActions.setAuth({ data: { username: user.username} }));
    }

    this.store.select(authSelectors.getAuth).subscribe(auth => {
      if (auth) {
        this.router.navigate(['/home']);
      }
    });
  }

}
