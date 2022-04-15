import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '../../database/entities/chat.entity';
import { Repository } from 'typeorm';
import { CreateChatDTO, IChat, MessageDTO } from '@squadly/core';
import { Message } from '../../database/entities/messages.entity';
import { PrismaService } from 'app/database/prisma.service';
import {
  Chat as ChatModel,
  ChatMembers,
  prisma,
  PrismaClient,
} from '@prisma/client';
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

  public async createChat(chatDTO: CreateChatDTO, userId: number) {
    const createdChat: Partial<Chat> = await this.prismaService.chat.create({
      data: {
        name: chatDTO.name,
        members: {
          create: [
            {
              userId,
            },
          ],
        },
      },
    });

    return await this.prismaService.chat.findUnique({
      where: {
        id: createdChat.id,
      },
      include: {
        members: true,
      },
    });
  }

  public async getChat(chatId: number): Promise<Chat> {
    return this.prismaService.chat
      .findUnique({
        where: { id: chatId },
        include: {
          members: true,
          messages: true,
        },
      })
      .then(async (chat) => ({
        ...chat,
        members: await this.getChatMembers(chat.members),
      }));
  }

  public async deleteChat(chatId: number): Promise<any> {
    const deleteChatMembers = this.prismaService.chatMembers.deleteMany({
      where: {
        chatId: chatId,
      },
    });

    const deleteMessages = this.prismaService.messages.deleteMany({
      where: {
        chatId: chatId,
      },
    });

    const deleteChat = this.prismaService.chat.delete({
      where: {
        id: chatId,
      },
    });

    const [
      messagesDeletedCount,
      membersDeletedCount,
      chatDeleted,
    ] = await this.prismaService.$transaction([
      deleteMessages,
      deleteChatMembers,
      deleteChat,
    ]);

    return {
      messagesDeletedCount,
      membersDeletedCount,
      chatDeleted,
    };
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

  public async addUserToChat(chatId: number, userId: number) {
    await this.prismaService.chatMembers.create({
      data: {
        chatId,
        userId,
      },
    });
  }

  private async getChatMembers(members: ChatMembers[]) {
    const userIds = members.map((row) => row.userId);
    return await this.usersService.getUsersByIds(userIds);
  }
}
