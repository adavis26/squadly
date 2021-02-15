import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ChatFeature from './chat.reducer';
import * as ChatActions from './chat.actions';

@Injectable()
export class ChatEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ChatActions.loadChatSuccess({ chat: {members: [], messages: []} });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ChatActions.loadChatFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
