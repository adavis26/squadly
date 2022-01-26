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

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ChatModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    ChatService,
    AuthStrategy,
    JwtStrategy,
  ],
  exports: [AuthService, JwtStrategy, JwtModule, PassportModule],
})
export class AuthModule {}
