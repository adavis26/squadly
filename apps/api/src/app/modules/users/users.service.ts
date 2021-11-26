import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/users.entity';
import { ILike, Like, Repository } from 'typeorm';
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
    const entity = this.userRepository.create(user);
    return await this.userRepository.save(entity);
  }

  public async searchUser(query: string) {
    return await this.userRepository.find({
      where: [
        { first_name: ILike(`%${query}%`) },
        { last_name: ILike(`%${query}%`) },
      ],
    });
  }

  public async getUserById(userId: number): Promise<User> {
    return await this.userRepository.findOne(userId, { relations: ['chats'] });
  }

  public async getUserPassword(
    username: string
  ): Promise<{ password: string; id: number }> {
    console.log(username);
    return await this.userRepository
      .createQueryBuilder()
      .select('id')
      .addSelect('password')
      .where('username = :username', { username })
      .getRawOne();
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
