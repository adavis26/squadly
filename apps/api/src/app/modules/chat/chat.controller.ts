import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Message } from '../../database/entities/messages.entity';
import { ChatService } from './chat.service';
import { MessageDTO } from '@squadly/core';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get(':chatId')
  async getChat(@Param('chatId') id: number): Promise<Message[]> {
    return await this.chatService.getMessages(id);
  }
}
