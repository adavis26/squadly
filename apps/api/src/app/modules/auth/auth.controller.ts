import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  Get,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SkipJwt } from 'app/core/decorators/skip-jwt.decorator';
import { JwtAuthGuard, LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import {User} from '../../core/decorators/user.decorator'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req, @Res() res: Response) {
    const payload = await this.authService.login(req.user);
    return await res
      .cookie('access_token', payload.access_token, {
        httpOnly: true,
        domain: 'localhost', // your domain here!
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  public async verify(@User() user: { id: number }) {
    return await this.userService.getUserById(user.id);
  }
}
