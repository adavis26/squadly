import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { Module } from '@nestjs/common';
import { ChatModule } from './modules/chat/chat.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, UsersModule, ChatModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
