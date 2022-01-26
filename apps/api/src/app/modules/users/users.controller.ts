import {
  Controller,
  Post,
  Put,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  AddUserToChatDTO,
  CreateUserDTO,
} from '../../../../../../libs/core/src/';
import { User as UserModel } from '@prisma/client';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async createUser(@Body() user: CreateUserDTO) {
    return await this.usersService.createUser(user);
  }

  @Get('')
  public async searchUser(@Query('query') query: string) {
    if (!query) {
      throw new BadRequestException('No query provided');
    }

    return await this.usersService.searchUser(query);
  }

  @Get('/:id')
  public async getUser(
    @Param('id', ParseIntPipe) userId: number
  ): Promise<Partial<UserModel>> {
    return await this.usersService.getUserById(userId);
  }

  @Post('chat')
  public async addUserToChat(@Body() payload: AddUserToChatDTO) {
    return await this.usersService.addUserToChat(payload);
  }
}
