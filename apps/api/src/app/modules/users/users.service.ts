import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddUserToChatDTO, CreateUserDTO } from '@squadly/core';
import { ChatService } from '../chat/chat.service';
import { PrismaService } from 'app/database/prisma.service';
import { users, Prisma } from '@prisma/client';
import { Sql } from '@prisma/client/runtime';

@Injectable()
export class UsersService {
  constructor(
    private readonly chatService: ChatService,
    private readonly prismaService: PrismaService
  ) {}

  public async createUser(user: CreateUserDTO) {
    return await this.prismaService.users.create({
      data: user,
    });
  }

  public async searchUser(query: string) {
    return await this.prismaService.users.findMany({
      where: {
        firstName: {
          contains: query,
        },
      },
    });
  }

  public async getUserById(userId: number): Promise<Partial<users>> {
    return await this.prismaService.users.findUnique({
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

  public async getUsersByIds(userIds: number[]): Promise<Partial<users>[]> {
    return this.prismaService.users.findMany({
      where: {
        id: { in: userIds },
      },
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
    return await this.prismaService.users.findUnique({
      where: { username },
      select: { password: true, id: true },
    });
  }

  public async addUserToChat(payload: AddUserToChatDTO) {
    return await this.prismaService.chat_members.create({ data: payload });
  }

  public async fuzzySearchUsername(query: string): Promise<any> {
    return await this.prismaService.$queryRawUnsafe(
      `SELECT id, username, "firstName", "lastName" FROM users WHERE SIMIlARITY(users.username, '${query}') > 0.25 LIMIT 10;`
    );
  }

  public async removeUserFromChat() {}
}
