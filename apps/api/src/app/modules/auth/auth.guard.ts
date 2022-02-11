import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
//   constructor(
//     private readonly reflector: Reflector,
//     private readonly authService: AuthService
//   ) {
//     super();
//   }

//   public async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const skipJwt = this.reflector.get<boolean>(
//       'SkipJwt',
//       context.getHandler()
//     );

//     if (skipJwt) {
//       return true;
//     }

//     const accessToken = request.headers['authorization'];

//     console.log(accessToken)

//     const ans = await this.authService.validateToken(accessToken);

//     if (!ans) {
//       throw new UnauthorizedException();
//     }

//     return true;
//   }
// }
