import { Component, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import * as fromAuth from '../../store/auth/reducers/auth.reducer'
import * as authSelectors from '../../store/auth/selectors/auth.selectors'
import * as authActions from '../../store/auth/actions/auth.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  auth$;
  user$;

  isAuthenticated = false;
  user;

  constructor(private store: Store<fromAuth.State>) {
    this.auth$ = this.store.select(authSelectors.getAuth);
    this.user$ = this.store.select(authSelectors.getUser);
  }

  ngOnInit() {
    this.auth$.subscribe(data => {
      if (data) {
        this.isAuthenticated = true;
      } else{
        this.isAuthenticated = false;
      }
    });

    this.user$.subscribe(data => {
      console.log(data);
      this.user = data;
    });
  }

  public logout() {
    this.store.dispatch(authActions.logout());
  }

}
