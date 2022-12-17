import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ErrorCodes } from 'src/shared/lib';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokensService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization as string;
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' && !token)
        throw new UnauthorizedException(ErrorCodes.unauth);

      const userData = this.tokenService.validateAccessToken(token);
      if (!userData) throw new UnauthorizedException(ErrorCodes.unauth);

      req.userId = userData?.id;
      req.user = true;
      return true;
    } catch (e) {
      throw new UnauthorizedException(ErrorCodes.unauth);
    }
  }
}
