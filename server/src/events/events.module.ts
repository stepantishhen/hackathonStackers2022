import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TokensService } from 'src/tokens/tokens.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [EventsService, TokensService, ConfigService, PrismaService],
  controllers: [EventsController],
})
export class EventsModule {}
