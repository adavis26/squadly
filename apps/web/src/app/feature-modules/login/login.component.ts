import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from 'apps/web/src/store/auth/auth.facade';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: UntypedFormGroup;
  public loginSub$: Subscription;

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly fb: UntypedFormBuilder,
    private readonly rotuer: Router
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.initSub();
  }

  public ngOnDestroy(): void {
    this.loginSub$.unsubscribe();
  }

  public initForm(): void {
    this.loginForm = this.fb.group({
      username: new UntypedFormControl(null, [Validators.required]),
      password: new UntypedFormControl(null, [Validators.required]),
    });
  }

  public initSub(): void {
    this.loginSub$ = combineLatest([
      this.authFacade.isAuthenticated$,
      this.authFacade.isAuthenticating$,
    ]).subscribe(([isAuthenticated, isAuthenticating]) => {
      if (isAuthenticated) {
        this.rotuer.navigate(['/']);
      }
    });
  }

  public login(): void {
    this.authFacade.login(this.loginForm.value);
  }
}
