import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { EMPTY, of, merge } from 'rxjs';

import * as MessagingActions from '../actions/messaging.actions';
import { MessagingService } from 'src/shared/services/messaging.service';



@Injectable()
export class MessagingEffects {

  loadChat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MessagingActions.LoadChat),
      mergeMap(req => this.ms.getChat(req).pipe(
        map(data => MessagingActions.LoadChatSuccess({ data })),
        catchError(error => of(MessagingActions.LoadChatFailure({ error }))
        )
      )
      )
    )
  });

  loadChats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MessagingActions.LoadChats),
      mergeMap(req => this.ms.getChats(req).pipe(
        map(data => MessagingActions.LoadChatsSuccess({ data })),
        catchError(error => of(MessagingActions.LoadChatsFailure({ error }))
        )
      )
      )
    )
  });

  sendMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MessagingActions.SendMessage),
      mergeMap((chatID, message) => this.ms.getChats({ chatID, message }).pipe(
        map(response => MessagingActions.SendMessageSuccess({ response })),
        catchError(error => of(MessagingActions.SendMessageFail({ error }))
        )
      )
      )
    )
  });

  constructor(private actions$: Actions, private ms: MessagingService) { }

}
