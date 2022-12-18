import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCodes } from 'src/shared/lib';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokensService,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization as string;
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' && !token)
        throw new UnauthorizedException(ErrorCodes.unauth);

      const userData = this.tokenService.validateAccessToken(token);
      if (!userData) throw new UnauthorizedException(ErrorCodes.unauth);

      const isAdmin = await this.prismaService.admin.findUnique({
        where: { userId: userData.id },
        select: null,
      });

      req.isAdmin = !!isAdmin;
      req.userId = userData?.id;
      return true;
    } catch (e) {
      throw new UnauthorizedException(ErrorCodes.unauth);
    }
  }
}
