import { Message } from './message.interface';
import { User } from './user.interface';

export interface Chat {
  messages: Message[];
  members: User[];
  chatId: number;
}
