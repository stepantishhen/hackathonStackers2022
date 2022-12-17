import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDTO } from './dto/create-event';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  async create(event: CreateEventDTO, userId: string) {
    await this.prismaService.event.create({
      data: {
        ...event,
        date: new Date(),
        createdBy: { connect: { userId } },
      },
    });
  }

  async getList(userId: string) {
    const events = await this.prismaService.event.findMany({
      include: {
        visitors: {
          where: {
            userId,
          },
          select: {
            attended: true,
          },
        },
        createdBy: {
          select: {
            user: {
              select: {
                firstName: true,
                surname: true,
                patronymic: true,
              },
            },
            organization: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 30,
    });

    return events;
    // return events.map(event => ({
    //   ...event,
    //   visitors: event.visitors.
    // }));
  }
}
