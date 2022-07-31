import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDTO, IChat, MessageDTO } from '@squadly/core';
import { PrismaService } from 'app/database/prisma.service';
import {
  chats,
  prisma,
  PrismaClient,
  messages,
  chat_members,
} from '@prisma/client';
import { UsersService } from '../users/users.service';

@Injectable()
export class ChatService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService
  ) {}

  public async createChat(chatDTO: CreateChatDTO, userId: number) {
    const createdChat: Partial<chats> = await this.prismaService.chats.create({
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

    return await this.prismaService.chats.findUnique({
      where: {
        id: createdChat.id,
      },
      include: {
        members: true,
      },
    });
  }

  public async getChat(chatId: number): Promise<chats> {
    return this.prismaService.chats
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
    const deleteChatMembers = this.prismaService.chat_members.deleteMany({
      where: {
        chatId: chatId,
      },
    });

    const deleteMessages = this.prismaService.messages.deleteMany({
      where: {
        chatId: chatId,
      },
    });

    const deleteChat = this.prismaService.chats.delete({
      where: {
        id: chatId,
      },
    });

    const [messagesDeletedCount, membersDeletedCount, chatDeleted] =
      await this.prismaService.$transaction([
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

  public async getChatsByUserId(userId: number): Promise<chats[]> {
    const chatsMembers: chat_members[] =
      await this.prismaService.chat_members.findMany({
        where: {
          userId,
        },
      });

    const chatIds = chatsMembers.map((chatMember) => chatMember.chatId);
    return await this.getChats(chatIds);
  }

  public async getChats(chatIds: number[]) {
    return this.prismaService.chats.findMany({
      where: {
        id: {
          in: chatIds,
        },
      },
    });
  }

  public async getMessage(messageId: number): Promise<chats> {
    return await this.prismaService.chats.findUnique({
      where: {
        id: messageId,
      },
    });
  }

  public async getMessages(chatId: number): Promise<messages[]> {
    return await this.prismaService.messages.findMany({ where: { chatId } });
  }

  public async saveMessage(message: MessageDTO): Promise<messages> {
    return await this.prismaService.messages.create({
      data: message,
    });

    // const chat: ChatModel = await this.getChat(message.chatId);
    // const entity: Partial<Message> = {
    //   ...message,
    //   timestamp: new Date(),
    //   chat,
    // };

    // const savedEntity = await this.messagesRepository.save(entity);

    // return await this.getMessage(savedEntity.id);
  }

  public async addUserToChat(chatId: number, userId: number) {
    await this.prismaService.chat_members.create({
      data: {
        chatId,
        userId,
      },
    });
  }

  private async getChatMembers(members: chat_members[]) {
    const userIds = members.map((row) => row.userId);
    return await this.usersService.getUsersByIds(userIds);
  }
}
