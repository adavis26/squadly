import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'app/database/database.module';
import { ChatService } from '../chat/chat.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ChatService],
})
export class UsersModule {}
