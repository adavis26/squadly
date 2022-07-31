import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { environment } from '../../environments/environment';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      // Check incoming query type
      if (params.model == 'users') {
        if (params.action == 'create') {
          params.args.data = {
            ...params.args.data,
            password: await this.hashPassword(params.args.data['password']),
          };
        }
      }
      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, environment.hashCyles);
  }
}
