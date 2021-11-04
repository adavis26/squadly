import { Message } from './message.interface';
import { User } from './user.interface';

export interface IChat {
  messages: Message[];
  members: User[];
  chatId: number;
  name: string;
}

export interface CreateChatDTO {
  name: string;
}
