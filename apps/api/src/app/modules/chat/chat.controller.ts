import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Message } from '../../../entity/messages.entity';
import { Chat } from '../../../../../../libs/core/src/lib/interfaces';
import { ChatService } from './chat.service';

export interface MessageDTO {
  content: string;
  userId: number;
  chatId: number;
}

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get(':id')
  async getChat(@Param('id') id: number): Promise<Message[]> {
    return await this.chatService.getMessages(id);
  }

  @Post('')
  async saveMessage(@Body() message: MessageDTO) {
    return await this.chatService.saveMessage({
      id: null,
      content: message.content,
      userId: message.userId,
      chatId: message.chatId,
      timestamp: new Date(),
    });
  }
}
