import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  public async login(username: string, proposedPassword: string): Promise<any> {
    const { id, password } = await this.usersService.getUserPassword(username);

    console.log(id, password);

    if (password && bcrypt.compareSync(proposedPassword, password)) {
      return await this.usersService.getUserById(id);
    }

    throw new UnauthorizedException('login failed');
  }
}
