import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';
import { TConfig } from 'src/shared/types';

@Injectable()
export class TokensService {
  constructor(
    private configService: ConfigService<TConfig>,
    private prismaService: PrismaService,
  ) {}

  generateTokens(payload: object) {
    const accessToken = sign(
      payload,
      this.configService.getOrThrow('TOKEN_ACCESS_KEY'),
      { expiresIn: '10m' },
    );
    const refreshToken = sign(
      payload,
      this.configService.getOrThrow('TOKEN_REFRESH_KEY'),
      {
        expiresIn: '30d',
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(
    userID: string,
    refreshToken: string,
    oldRefreshToken?: string,
  ) {
    const tokenData = oldRefreshToken
      ? await this.prismaService.tokens.findUnique({
          where: { refreshToken: oldRefreshToken },
        })
      : null;

    if (tokenData) {
      return this.prismaService.tokens.update({
        where: { id: tokenData.id },
        data: { refreshToken },
      });
    }

    return this.prismaService.tokens.create({
      data: { refreshToken, User: { connect: { id: userID } } },
    });
  }

  async removeToken(refreshToken: string) {
    return this.prismaService.tokens.delete({ where: { refreshToken } });
  }

  validateAccessToken(token: string) {
    try {
      const userData = verify(
        token,
        this.configService.getOrThrow('TOKEN_ACCESS_KEY'),
      );
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = verify(
        token,
        this.configService.getOrThrow('TOKEN_REFRESH_KEY'),
      );
      return userData;
    } catch (e) {
      return null;
    }
  }
}
