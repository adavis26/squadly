import { Injectable } from '@nestjs/common';
import { Chat } from '../../../../../../libs/core/src/lib/interfaces/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../../entity/messages.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly usersRepository: Repository<Message>
  ) {}

  async getMessages(id: number): Promise<Message[]> {
    return await this.usersRepository.find();
  }

  async saveMessage(message: Message): Promise<Message> {
    return await this.usersRepository.save(message);
  }
}
