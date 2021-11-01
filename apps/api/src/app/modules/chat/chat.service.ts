import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDTO } from '../../../../../../libs/core/src/lib/interfaces';
import { Message } from '../../database/entities/messages.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>
  ) {}

  public async getMessages(chatId: number): Promise<Message[]> {
    return await this.messagesRepository.find();
  }

  public async getMembers(chatId: number) {
    // Promise<Message[]> 
    // return await
  }

  public async saveMessage(message: MessageDTO): Promise<Message> {
    const entity: Partial<Message> = {
      ...message,
      timestamp: new Date(),
    };

    return await this.messagesRepository.save(entity);
  }
}
