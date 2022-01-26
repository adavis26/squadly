import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  public async validate(
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

  public async login(user: any) {
    console.log(user)
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
