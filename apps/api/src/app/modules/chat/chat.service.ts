import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '../../database/entities/chat.entity';
import { Repository } from 'typeorm';
import { CreateChatDTO, IChat, MessageDTO } from '@squadly/core';
import { Message } from '../../database/entities/messages.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    @InjectRepository(Chat)
    private readonly chatRepostiory: Repository<Chat>
  ) {}

  public async createChat(chat: CreateChatDTO) {
    return await this.chatRepostiory.save(chat);
  }

  public async getChat(chatId: number): Promise<Chat> {
    return await this.chatRepostiory.findOne(chatId, {
      relations: ['messages', 'members'],
    });
  }

  // public async getChats(userId: number): Promise<Chat[]> {
  //   // return await this.chatRepostiory.createQueryBuilder('').select().from
  // }

  public async getMessage(messageId: number): Promise<Message> {
    return await this.messagesRepository.findOne(messageId);
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
