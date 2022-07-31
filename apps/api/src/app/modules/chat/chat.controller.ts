import {
  Body,
  Controller,
  Delete,
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
import { User } from 'app/core/decorators/user.decorator';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get(':chatId')
  @UseGuards(JwtAuthGuard)
  async getChat(@Param('chatId', ParseIntPipe) id: number): Promise<ChatModel> {
    return await this.chatService.getChat(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createChat(@Body() chat: CreateChatDTO, @User() user) {
    return await this.chatService.createChat(chat, user.id);
  }

  @Post(':chatId/add/:userId')
  @UseGuards(JwtAuthGuard)
  public async addUserToChat(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    return await this.chatService.addUserToChat(chatId, userId);
  }

  @Delete(':chatId')
  @UseGuards(JwtAuthGuard)
  public async deleteChat(@Param('chatId', ParseIntPipe) chatId: number) {
    return await this.chatService.deleteChat(chatId);
  }
}
