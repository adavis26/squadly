import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../../../../libs/core/src/lib/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  public async validateLogin(
    username: string,
    proposedPassword: string
  ): Promise<any> {
    const user = await this.usersService.getUserPassword(username);

    if (!user) {
      throw new UnauthorizedException('login failed');
    }

    const { password, id } = user;

    if (password && bcrypt.compareSync(proposedPassword, password)) {
      return await this.usersService.getUserById(id);
    }

    throw new UnauthorizedException('login failed');
  }

  public async login(user: User) {
    const payload = { id: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  public async validateToken(accessToken: string): Promise<any> {
    try {
      const res = await this.jwtService.verifyAsync(accessToken, {});
      return true;
    } catch (e) {
      console.log('e');
      return false;
    }
  }
}
