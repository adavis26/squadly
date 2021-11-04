import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/messages.entity';
import { User } from './entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
    TypeOrmModule.forFeature([Message, User, Chat]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
