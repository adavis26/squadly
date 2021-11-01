import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { Message } from './entities/messages.entity';
import { User } from './entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
    TypeOrmModule.forFeature([Message, User]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
