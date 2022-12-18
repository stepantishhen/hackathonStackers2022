import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/auth/dto/create-user';
import { compare, hash } from 'bcryptjs';
import { TokensService } from 'src/tokens/tokens.service';
import { UserDTO } from './dto/user';
import { ErrorCodes } from 'src/shared/lib';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO } from './dto/login';

@Injectable()
export class AuthService {
  constructor(
    private tokensService: TokensService,
    private prismaService: PrismaService,
  ) {}

  async login({ email, password }: LoginDTO) {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
      include: { visitor: true, admin: true },
    });
    if (!user) throw new BadRequestException(ErrorCodes.userNotFound);

    const isPassword = await compare(password, user.password);
    if (!isPassword)
      throw new UnauthorizedException(ErrorCodes.incorrectUserData);

    const userDTO = new UserDTO(user);
    const tokens = await this.tokensService.generateTokens({ ...userDTO });
    await this.tokensService.saveToken(userDTO.id, tokens.refreshToken);

    return {
      user: userDTO,
      ...tokens,
    };
  }

  async signup(dto: CreateUserDTO) {
    const candidate = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (candidate) {
      throw new BadRequestException('Пользователь уже зарегистрирован');
    }

    const hashPassword = await hash(dto.password, 5);
    const user = await this.prismaService.user.create({
      data: {
        ...dto,
        password: hashPassword,
        visitor: { create: { telegram: 'telega' } },
      },
      include: { admin: true, visitor: true },
    });

    const userDTO = new UserDTO(user);
    const tokens = this.tokensService.generateTokens({ ...userDTO });
    await this.tokensService.saveToken(userDTO.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDTO,
    };
  }

  async logout(refreshToken: string) {
    try {
      await this.tokensService.removeToken(refreshToken);
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  }

  async refresh(refreshToken: string) {
    try {
      const userData = this.tokensService.validateRefreshToken(refreshToken);
      const tokenFromDB = await this.prismaService.tokens.findUnique({
        where: { refreshToken },
        include: { User: { include: { admin: true, visitor: true } } },
      });

      if (!userData || !tokenFromDB)
        throw new UnauthorizedException(ErrorCodes.unauth);

      const userDTO = new UserDTO(tokenFromDB.User!);
      const tokens = this.tokensService.generateTokens({ ...userDTO });
      await this.tokensService.saveToken(
        tokenFromDB.User!.id,
        tokens.refreshToken,
        tokenFromDB.refreshToken,
      );

      return { ...tokens, user: userDTO };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException(ErrorCodes.unauth);
    }
  }
}
