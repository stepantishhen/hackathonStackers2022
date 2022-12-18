import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TConfig } from 'src/shared/types';
import * as cookieParser from 'cookie-parser';
import { TransformInterceptor } from './shared/lib';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: '*',
      methods: '*',
    }),
  );
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = app.get(ConfigService);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(cookieParser());
  await app.listen(config.getOrThrow<TConfig['PORT']>('PORT'));
}
bootstrap();
