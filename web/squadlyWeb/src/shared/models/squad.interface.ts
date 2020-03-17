import { IMessage } from './message.interface';
import { IChat } from './chat.interface';

export interface ISquad {
    squad_name: String,
    chats: IChat[]
}
