import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'app/database/database.module';
import { ChatService } from '../chat/chat.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { JwtStrategy } from '../auth/auth.strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ChatService, JwtStrategy, JwtAuthGuard],
})
export class UsersModule {}
