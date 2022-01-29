import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '../../database/entities/chat.entity';
import { Repository } from 'typeorm';
import { CreateChatDTO, IChat, MessageDTO } from '@squadly/core';
import { Message } from '../../database/entities/messages.entity';
import { PrismaService } from 'app/database/prisma.service';
import { Chat as ChatModel, ChatMembers, PrismaClient } from '@prisma/client';
import { UsersService } from '../users/users.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService
  ) {}

  public async createChat(chat: CreateChatDTO, userId: number) {
    const createdChat = await this.prismaService.chat.create({
      data: {
        ...chat,
        members: {
          create: [
            {
              userId,
            },
          ],
        },
      },
    });

    return {
      ...chat,
      members: await this.getChatMembers(createdChat.members),
    };
  }

  public async getChat(chatId: number): Promise<Chat> {
    return this.prismaService.chat
      .findUnique({
        where: { id: chatId },
        include: {
          members: true,
        },
      })
      .then(async (chat) => ({
        ...chat,
        members: await this.getChatMembers(chat.members),
      }));
  }

  public async getChatsByUserId(userId: number): Promise<ChatModel[]> {
    const chatsMembers: ChatMembers[] = await this.prismaService.chatMembers.findMany(
      {
        where: {
          userId,
        },
      }
    );

    const chatIds = chatsMembers.map((chatMember) => chatMember.chatId);
    return await this.getChats(chatIds);
  }

  public async getChats(chatIds: number[]) {
    return this.prismaService.chat.findMany({
      where: {
        id: {
          in: chatIds,
        },
      },
    });
  }

  public async getMessage(messageId: number): Promise<Message> {
    return await this.prismaService.chat.findUnique({
      where: {
        id: messageId,
      },
    });
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

    return await this.getMessage(savedEntity.id);
  }

  private async getChatMembers(members: ChatMembers[]) {
    const userIds = members.map((row) => row.userId);
    return await this.usersService.getUsersByIds(userIds);
  }
}
