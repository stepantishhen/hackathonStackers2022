import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrammyService } from 'src/grammy/grammy.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TConfig } from 'src/shared/types';
import { CreateEventDTO } from './dto/create-event';
import { UserEventDTO } from './dto/user-event';
import { ScanDTO } from './dto/scan';

@Injectable()
export class EventsService {
  constructor(
    private prismaService: PrismaService,
    private grammyService: GrammyService,
    private configService: ConfigService<TConfig>,
  ) {}

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

    const qrApiUrl = new URL('https://api.qrserver.com/v1/create-qr-code');
    qrApiUrl.searchParams.set('data', JSON.stringify({ eventId, userId }));
    qrApiUrl.searchParams.set('size', '1024x1024');

    await this.grammyService.api.sendPhoto(
      this.configService.getOrThrow('TG_USER_ID'),
      qrApiUrl.href,
    );
  }

  async unsubscribe({ eventId }: UserEventDTO, userId: string) {
    await this.prismaService.eventVisitor.delete({
      where: {
        userId_eventId: { eventId, userId },
      },
    });
  }

  async userEvents(userId: string) {
    return this.prismaService.eventVisitor.findMany({
      where: { userId },
      take: 25,
      include: { Event: true },
    });
  }

  async scan({ eventId, userId }: ScanDTO) {
    const eventVisitor =
      await this.prismaService.eventVisitor.findUniqueOrThrow({
        where: { userId_eventId: { userId, eventId } },
      });

    if (eventVisitor.attended) throw new ConflictException();

    await this.prismaService.eventVisitor.update({
      where: { id: eventVisitor.id },
      data: { attended: true },
    });
  }
}
