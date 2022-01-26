import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/users.entity';
import { ILike, Like, Repository } from 'typeorm';
import { AddUserToChatDTO, CreateUserDTO } from '@squadly/core';
import { ChatService } from '../chat/chat.service';
import { PrismaService } from 'app/database/prisma.service';
import { User as UserModel } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly chatService: ChatService,
    private prismaService: PrismaService
  ) {}

  public async createUser(user: CreateUserDTO) {
    return await this.prismaService.user.create({
      data: user,
    });
    return await this.userRepository.save(this.userRepository.create(user));
  }

  public async searchUser(query: string) {
    // return await this.
    return await this.userRepository.find({
      where: [
        { first_name: ILike(`%${query}%`) },
        { last_name: ILike(`%${query}%`) },
      ],
    });
  }

  public async getUserById(userId: number): Promise<UserModel> {
    return await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        password: false,
      },
    });
  }

  public async getUserPassword(
    username: string
  ): Promise<{ password: string; id: number }> {
    return await this.prismaService.user.findUnique({
      where: { username },
      select: { password: true, id: true },
    });
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
