import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'app/database/database.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { ChatModule } from '../chat/chat.module';
import { ChatService } from '../chat/chat.service';

@Module({
  imports: [DatabaseModule, UsersModule, ChatModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, ChatService],
})
export class AuthModule {}
