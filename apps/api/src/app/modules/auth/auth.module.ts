import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'app/database/database.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { ChatModule } from '../chat/chat.module';
import { ChatService } from '../chat/chat.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthStrategy, JwtStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth.guard';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ChatModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    ChatService,
    AuthStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
