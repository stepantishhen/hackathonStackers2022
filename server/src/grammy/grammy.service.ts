import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Bot } from 'grammy';
import { TConfig } from 'src/shared/types';
import { generateUpdateMiddleware } from 'telegraf-middleware-console-time/dist';

@Injectable()
export class GrammyService extends Bot implements OnModuleInit {
  constructor(private configService: ConfigService<TConfig>) {
    super(configService.getOrThrow('BOT_TOKEN'), {
      client: {
        buildUrl: (root, token, method) => `${root}/bot${token}/test/${method}`,
      },
    });
  }

  onModuleInit() {
    this.use(generateUpdateMiddleware());
  }
}
