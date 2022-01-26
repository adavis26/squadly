import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/messages.entity';
import { User } from './entities/users.entity';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
    TypeOrmModule.forFeature([Message, User, Chat]),
  ],
  providers: [PrismaService],
  exports: [TypeOrmModule, PrismaService],
})
export class DatabaseModule {}
