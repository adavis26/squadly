import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as ormconfig from '../../../ormconfig.js';
import { Message } from './entities/messages.entity';
import { User } from './entities/users.entity';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return { ...ormconfig, entities: [Message, User] } as TypeOrmModuleOptions;
  }
}
