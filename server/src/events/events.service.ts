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

  async getList() {
    return this.prismaService.event.findMany({
      include: {
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
  }
}
