import { Module } from '@nestjs/common';

import { AppGateway } from './app.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './modules/chat/chat.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ChatModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
