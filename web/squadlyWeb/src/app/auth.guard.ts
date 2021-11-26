import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAuth from './store/auth/reducers/auth.reducer'
import * as authSelectors from './store/auth/selectors/auth.selectors'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromAuth.State>, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    route: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.store.select(authSelectors.getAuth).subscribe(
      auth => {
        if (!auth) {
          this.router.navigate(['/login']);
        }
      }
    );
    return true;
  }

}
