import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user';
import { AuthService } from './auth.service';
import { AllExceptionsFilter } from 'src/shared/lib';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { TConfig } from 'src/shared/types';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService<TConfig>,
  ) {}

  @Post('/login')
  @UseFilters(AllExceptionsFilter)
  async login(@Body() userDto: CreateUserDTO, @Res() response: Response) {
    const userData = await this.authService.login(userDto);
    response.cookie(
      this.configService.getOrThrow('cookieRefreshTokenKey'),
      userData.refreshToken,
      {
        maxAge: this.configService.getOrThrow('httpOnlyCookieAge'),
        httpOnly: true,
      },
    );

    return response.json({
      data: {
        accessToken: userData.accessToken,
      },
    });
  }

  @Post('/signup')
  @UseFilters(AllExceptionsFilter)
  async signup(@Body() userDto: CreateUserDTO, @Res() response: Response) {
    const userData = await this.authService.signup(userDto);
    response.cookie(
      this.configService.getOrThrow('cookieRefreshTokenKey'),
      userData.refreshToken,
      {
        maxAge: this.configService.getOrThrow('httpOnlyCookieAge'),
        httpOnly: true,
      },
    );

    return response.json({
      data: {
        accessToken: userData.accessToken,
      },
    });
  }

  @Post('/logout')
  @UseFilters(AllExceptionsFilter)
  async logout(@Req() req: Request, @Res() response: Response) {
    const { refreshToken }: { refreshToken: string | undefined } = req.cookies;

    if (refreshToken) {
      await this.authService.logout(refreshToken);
      response.clearCookie(
        this.configService.getOrThrow('cookieRefreshTokenKey'),
      );

      return response.send(200);
    } else {
      throw new BadRequestException();
    }
  }

  @Get('/refresh')
  @UseFilters(AllExceptionsFilter)
  async refresh(@Req() req: Request, @Res() response: Response) {
    const { refreshToken }: { refreshToken: string | undefined } = req.cookies;

    if (refreshToken) {
      const userData = await this.authService.refresh(refreshToken);
      response.cookie(
        this.configService.getOrThrow('cookieRefreshTokenKey'),
        userData.refreshToken,
        {
          maxAge: this.configService.getOrThrow('httpOnlyCookieAge'),
          httpOnly: true,
        },
      );

      return response.json({
        data: {
          accessToken: userData.accessToken,
        },
      });
    } else {
      throw new BadRequestException();
    }
  }
}
