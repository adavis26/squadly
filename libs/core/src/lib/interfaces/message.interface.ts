export interface Message {
  id: number;
  content: string;
  userId: number;
  timestamp: Date;
}

export interface MessageDTO {
  content: string;
  userId: number;
  chatId: number;
}
