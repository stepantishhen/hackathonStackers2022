import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth-guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { AllExceptionsFilter } from 'src/shared/lib';
import { CreateEventDTO } from './dto/create-event';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(
    private eventService: EventsService,
    private prismaService: PrismaService,
  ) {}

  @Post('/')
  @UseFilters(AllExceptionsFilter)
  @UseGuards(AuthGuard)
  async create(@Body() event: CreateEventDTO, @Req() req: Request) {
    await this.prismaService.admin.findUniqueOrThrow({
      // @ts-ignore
      where: { userId: req.userId },
    });

    return this.eventService.create(event);
  }
}
