import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromMessaging from '../store/messaging/reducers/messaging.reducer';
import * as messagingActions from '../store/messaging/actions/messaging.actions';
import { MessagingService } from 'src/shared/services/messaging.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public chats$;

  constructor(private messagingStore: Store<fromMessaging.State>,
    private ms: MessagingService) { 
  }

  ngOnInit() {
  }

  public newChat() {
    const chat = {
      chat_name: "sports",
      chat_description: "dudes talkin bout sports",
      chat_members: []
    }

    this.ms.newChat(chat);
    // console.log(chat$);

    // chat$.subscribe(data => console.log(data));
  }

}
