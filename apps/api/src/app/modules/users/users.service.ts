import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../../../../../../libs/core/src/lib/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public async createUser(user: CreateUserDTO) {
    await this.userRepository.save(user);
  }
  
}
