import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { TConfig } from 'src/shared/types';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private configService: ConfigService<TConfig>) {
    super({
      datasources: { db: { url: configService.getOrThrow('DATABASE_URL') } },
    });
  }
}
