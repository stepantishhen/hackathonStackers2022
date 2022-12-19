import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TokensService } from 'src/tokens/tokens.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { GrammyService } from 'src/grammy/grammy.service';

@Module({
  providers: [
    EventsService,
    TokensService,
    ConfigService,
    PrismaService,
    GrammyService,
  ],
  controllers: [EventsController],
})
export class EventsModule {}
