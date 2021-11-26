import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Message } from '../../database/entities/messages.entity';
import { ChatService } from './chat.service';
import { IChat, CreateChatDTO } from '@squadly/core';
import { Chat } from 'app/database/entities/chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get(':chatId')
  async getChat(@Param('chatId') id: number): Promise<Chat> {
    return await this.chatService.getChat(id);
  }

  @Post()
  public async createChat(@Body() chat: CreateChatDTO) {
    this.chatService.createChat(chat);
  }
}
