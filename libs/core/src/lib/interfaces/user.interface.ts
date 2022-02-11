import { IChat } from './chat.interface';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  chats?: IChat[];
}

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface AddUserToChatDTO {
  chatId: number;
  userId: number;
}
