import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '../../database/entities/chat.entity';
import { Repository } from 'typeorm';
import { CreateChatDTO, IChat, MessageDTO } from '@squadly/core';
import { Message } from '../../database/entities/messages.entity';
import { PrismaService } from 'app/database/prisma.service';
import { Chat as ChatModel, PrismaClient } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    @InjectRepository(Chat)
    private readonly chatRepostiory: Repository<Chat>,
    private readonly prismaService: PrismaService
  ) {}

  public async createChat(chat: CreateChatDTO) {
    return await this.prismaService.chat.create({ data: chat });
  }

  public async getChat(chatId: number): Promise<Chat> {
    return await this.prismaService.chat.findUnique({
      where: { id: chatId },
    });
  }

  public async getChats(userId: number): Promise<ChatModel[]> {
    return await this.prismaService.chat({
      where: {
        user: userId,
      },
    });
  }

  public async getMessage(messageId: number): Promise<Message> {
    return await this.prismaService.chat.find({});
    // return await this.messagesRepository.findOne(messageId);
  }

  public async getMessages(chatId: number): Promise<Message[]> {
    return await this.messagesRepository.find();
  }

  public async saveMessage(message: MessageDTO): Promise<Message> {
    const chat: Chat = await this.getChat(message.chatId);
    const entity: Partial<Message> = {
      ...message,
      timestamp: new Date(),
      chat,
    };

    const savedEntity = await this.messagesRepository.save(entity);

    return this.getMessage(savedEntity.id);
  }
}
