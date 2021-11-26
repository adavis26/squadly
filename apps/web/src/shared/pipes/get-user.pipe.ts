import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'libs/core/src';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ChatFacade } from '../../app/feature-modules/chat/+state/chat.facade';

@Pipe({
  name: 'getUser',
})
export class GetUserPipe implements PipeTransform {
  constructor(private readonly chatFacade: ChatFacade) {}

  transform(userId: number): Observable<User> {
    return this.chatFacade.getUser$(userId).pipe(map((data) => data));
  }
}
