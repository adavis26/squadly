import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { Module } from '@nestjs/common';
import { ChatModule } from './modules/chat/chat.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { JwtStrategy } from './modules/auth/auth.strategy';
import { JwtAuthGuard } from './modules/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    UsersModule,
    ChatModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        prettyPrint: {
          colorize: true,
          levelFirst: true,
          ignore: 'req.headers,req.remoteAddress,req.remotePort',
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
