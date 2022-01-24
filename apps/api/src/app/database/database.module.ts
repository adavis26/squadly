import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/messages.entity';
import { User } from './entities/users.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
    TypeOrmModule.forFeature([Message, User, Chat]),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'squadly',
      models: [],
    }),
  ],
  exports: [TypeOrmModule, SequelizeModule],
})
export class DatabaseModule {}
