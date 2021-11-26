import { Component, Input, OnInit } from '@angular/core';
import { Message, User } from 'libs/core/src';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  @Input() user: User;
  @Input() currentUserId: number;

  constructor() {}

  ngOnInit() {}
}
