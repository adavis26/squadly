import { Message } from './message.interface';
import { User } from './user.interface';

export interface IChat {
  messages: Message[];
  members: User[];
  id: number;
  name: string;
}

export interface IShortChat {
  id: number;
  name: string;
}

export interface CreateChatDTO {
  name: string;
}

export interface DeleteChatResponse {
  messagesDeletedCount: { count: number };
  membersDeletedCount: { count: number };
  chatDeleted: { id: number; name: string };
}
