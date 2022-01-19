import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  public async login(username: string, proposedPassword: string): Promise<any> {
    const user = await this.usersService.getUserPassword(username);

    if (!user) {
      throw new UnauthorizedException('login failed');
    }

    const { password, id } = user;

    if (password && bcrypt.compareSync(proposedPassword, password)) {
      return this.usersService.getUserById(id);
    }

    throw new UnauthorizedException('login failed');
  }
}
