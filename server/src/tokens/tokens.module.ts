import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokensService } from './tokens.service';

@Module({
  providers: [TokensService, ConfigService, PrismaService],
  exports: [TokensService],
})
export class TokensModule {}
