import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as ChatActions from './chat.actions';
import { ChatService } from 'apps/web/src/shared/services/chat.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ChatEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.init),
      mergeMap(({ chatId }) =>
        this.chatService.getChat(chatId).pipe(
          map((chat) => {
            console.log(chat);
            return ChatActions.loadChatSuccess({ chat });
          }),
          catchError((error) => of(ChatActions.loadChatFailure({ error })))
        )
      )
      // fetch({
      //   run: (action, { chatId }) => {
      //     return this.chatService.getChat(chatId).pipe(map(chat => ))
      //     // Your custom service 'load' logic goes here. For now just return a success action...
      //   },

      //   onError: (action, error) => {
      //     console.error('Error', error);
      //     return ChatActions.loadChatFailure({ error });
      //   },
      // })
    )
  );

  constructor(private actions$: Actions, private chatService: ChatService) {}
}
