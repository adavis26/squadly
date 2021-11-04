import { Controller, Post, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '../../../../../../libs/core/src/';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async createUser(@Body() user: CreateUserDTO) {
    console.log(user);
    return await this.usersService.createUser(user);
  }
}
