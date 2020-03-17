import { IMessage } from './message.interface';

export interface IChat {
    id: String,
    name: String,
    description: String,
    messages: IMessage[],
    chat_members: [],
    bg_color: String
}
