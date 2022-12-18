import {
  Body,
  Controller,
  Get,
  MethodNotAllowedException,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth-guard';
import { AllExceptionsFilter } from 'src/shared/lib';
import { SRequest } from 'src/shared/types';
import { CreateEventDTO } from './dto/create-event';
import { UserEventDTO } from './dto/user-event';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventService: EventsService) {}

  @Post('/')
  @UseFilters(AllExceptionsFilter)
  @UseGuards(AuthGuard)
  async create(@Body() event: CreateEventDTO, @Req() req: SRequest) {
    if (!req.isAdmin) throw new MethodNotAllowedException();

    return this.eventService.create(event, req.userId);
  }

  @Get('/')
  @UseFilters(AllExceptionsFilter)
  @UseGuards(AuthGuard)
  async list(@Req() req: SRequest) {
    return this.eventService.getList(req.userId);
  }

  @Post('/subscribe')
  @UseFilters(AllExceptionsFilter)
  @UseGuards(AuthGuard)
  async subscribe(@Body() userEventDTO: UserEventDTO, @Req() req: SRequest) {
    return this.eventService.subscribe(userEventDTO, req.userId);
  }

  @Post('/unsubscribe')
  @UseFilters(AllExceptionsFilter)
  @UseGuards(AuthGuard)
  async unsubscribe(@Body() userEventDTO: UserEventDTO, @Req() req: SRequest) {
    return this.eventService.unsubscribe(userEventDTO, req.userId);
  }
}
