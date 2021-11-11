import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/users.entity';
import { Repository } from 'typeorm';
import { AddUserToChatDTO, CreateUserDTO } from '@squadly/core';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly chatService: ChatService
  ) {}

  public async createUser(user: CreateUserDTO) {
    return await this.userRepository.save(user);
  }

  public async getUser(userId: number): Promise<User> {
    return await this.userRepository.findOne(userId, {relations: ['chats']});
  }

  public async addUserToChat(payload: AddUserToChatDTO) {
    const chatToAdd = await this.chatService.getChat(payload.chatId);
    const user = await this.userRepository.findOne(payload.userId);

    return await this.userRepository.save({
      ...user,
      chats: [chatToAdd],
    });
  }

  public async removeUserFromChat() {}
}
