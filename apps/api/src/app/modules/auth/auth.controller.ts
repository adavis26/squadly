import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SkipJwt } from 'app/core/decorators/skip-jwt.decorator';
import { LocalAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @SkipJwt()
  @Post('login')
  public async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
