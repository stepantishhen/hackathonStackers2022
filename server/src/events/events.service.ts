import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDTO } from './dto/create-event';
import { UserEventDTO } from './dto/user-event';

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
  }

  async subscribe({ eventId }: UserEventDTO, userId: string) {
    const event = await this.prismaService.eventVisitor.findUnique({
      where: { userId_eventId: { eventId, userId } },
      select: null,
    });
    if (event) throw new ConflictException();

    await this.prismaService.eventVisitor.create({
      data: {
        Event: { connect: { id: eventId } },
        visitor: { connect: { userId } },
        attended: false,
      },
    });
  }

  async unsubscribe({ eventId }: UserEventDTO, userId: string) {
    await this.prismaService.eventVisitor.delete({
      where: {
        userId_eventId: { eventId, userId },
      },
    });
  }
}
