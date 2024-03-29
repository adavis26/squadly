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

  joinChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.joinChat),
      mergeMap((payload) => {
        try {
          this.chatSocketService.joinChat(payload.chatId, payload.userId);
          return of(ChatActions.joinChatSuccess());
        } catch (error) {
          return of(ChatActions.joinChatFail({ error }));
        }
      })
    )
  );

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.sendMessage),
      mergeMap(({ content }) => {
        try {
          this.chatSocketService.sendMessage(content);
          return of(ChatActions.sendMessageSuccess());
        } catch (error) {
          return of(ChatActions.sendMessageFail({ error }));
        }
      })
    )
  );

  createChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.createChat),
      mergeMap(({ chat }) =>
        this.chatService.createChat(chat).pipe(
          map((chat) => ChatActions.createChatSuccess({ chat })),
          catchError((error) => of(ChatActions.createChatFail({ error })))
        )
      )
    )
  );

  deleteChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.deleteChat),
      mergeMap(({ chatId }) =>
        this.chatService.deleteChat(chatId).pipe(
          map((deletedResponse) =>
            ChatActions.deleteChatSuccess({
              chatId: deletedResponse.chatDeleted.id,
            })
          ),
          catchError((error) => of(ChatActions.deleteChatFail({ error })))
        )
      )
    )
  );

  getChatsUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.getChatsUser),
      mergeMap(({ userId }) =>
        this.chatService.getChatsUser(userId).pipe(
          map((chats) => ChatActions.getChatsUserSuccess({ chats })),
          catchError((error) => of(ChatActions.getChatsUserFail({ error })))
        )
      )
    )
  );

  addUserToChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.addUserToChat),
      mergeMap(({ userId, chatId }) =>
        this.chatService.addUserToChat(chatId, userId).pipe(
          map((members) => ChatActions.addUserToChatSuccess({ members })),
          catchError((error) => of(ChatActions.addUserToChatFail({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly chatService: ChatService,
    private readonly chatSocketService: ChatSocketService
  ) {}
}
