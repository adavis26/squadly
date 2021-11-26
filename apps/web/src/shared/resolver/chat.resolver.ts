import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ChatFacade } from '../../app/feature-modules/chat/+state/chat.facade';

@Injectable({
  providedIn: 'root',
})
export class ChatResolver implements Resolve<boolean> {
  constructor(private readonly chatFacade: ChatFacade) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.chatFacade.loadChat(route.params.id);
    return of(true);
  }
}
