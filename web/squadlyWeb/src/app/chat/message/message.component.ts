import { Component, OnInit, Input } from '@angular/core';
import * as fromAuth from '../../store/auth/reducers/auth.reducer';
import * as authSelectors from '../../store/auth/selectors/auth.selectors';
import { State, select } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message;
  @Input() user;

  constructor() { }

  ngOnInit() {

  }

}
