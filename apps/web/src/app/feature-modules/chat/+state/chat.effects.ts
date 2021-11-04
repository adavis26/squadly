import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as ChatActions from './chat.actions';
import { ChatService } from 'apps/web/src/shared/services/chat.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ChatSocketService } from 'apps/web/src/shared/services/chat.socket.service';

@Injectable()
export class ChatEffects {
  loadChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.loadChat),
      mergeMap(({ chatId }) =>
        this.chatService.getChat(chatId).pipe(
          map((chat) => ChatActions.loadChatSuccess({ chat })),
          catchError((error) => of(ChatActions.loadChatFailure({ error })))
        )
      )
    )
  );

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.sendMessage),
      mergeMap(({ message }) => {
        try {
          this.chatSocketService.sendMessage(message);
          return of(ChatActions.sendMessageSuccess({ message }));
        } catch (error) {
          return of(ChatActions.sendMessageFail({ error }));
        }
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly chatService: ChatService,
    private readonly chatSocketService: ChatSocketService
  ) {}
}
