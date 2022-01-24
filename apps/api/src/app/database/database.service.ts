import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as ormconfig from '../../../ormconfig';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/messages.entity';
import { User } from './entities/users.entity';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(ormconfig)
    return {
      ...ormconfig,
      entities: [Chat, Message, User],
    } as TypeOrmModuleOptions;
  }
}
