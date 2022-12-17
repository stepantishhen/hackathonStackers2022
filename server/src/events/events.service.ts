import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDTO } from './dto/create-event';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  async create(event: CreateEventDTO) {
    await this.prismaService.event.create({
      data: {
        ...event,
        date: new Date(),
      },
    });
  }
}
