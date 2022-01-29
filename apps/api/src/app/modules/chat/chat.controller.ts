import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Message } from '../../database/entities/messages.entity';
import { ChatService } from './chat.service';
import { IChat, CreateChatDTO } from '@squadly/core';
import { Chat } from 'app/database/entities/chat.entity';
import { Chat as ChatModel } from '@prisma/client';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get(':chatId')
  @UseGuards(JwtAuthGuard)
  async getChat(@Param('chatId', ParseIntPipe) id: number): Promise<Chat> {
    return await this.chatService.getChat(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createChat(@Body() chat: CreateChatDTO) {
    this.chatService.createChat(chat);
  }
}
