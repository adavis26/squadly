import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromMessaging from '../../store/messaging/reducers/messaging.reducer';
import * as messagingActions from '../../store/messaging/actions/messaging.actions';
import * as messagingSelectors from '../../store/messaging/selectors/messaging.selectors';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css']
})
export class ChatCardComponent implements OnInit {

  public chats$;

  constructor(private messagingStore: Store<fromMessaging.State>) { }

  ngOnInit() {
    const chatID = 'dfj12k1ljfa124';

    this.messagingStore.dispatch(messagingActions.LoadChats({ squadID: '' }));
    this.chats$ = this.messagingStore.pipe(select(messagingSelectors.getChats));
  }


}
