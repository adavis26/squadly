import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from 'apps/web/src/store/auth/auth.facade';
import { User } from 'libs/core/src';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public user$: Observable<User>;
  constructor(
    private readonly authFacade: AuthFacade,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.user$ = this.authFacade.user$;
  }

  public logout() {
    this.authFacade.logout();
    this.router.navigate(['/login']);
  }
}
