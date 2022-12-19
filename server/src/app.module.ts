import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { EventsModule } from './events/events.module';
import { GrammyService } from './grammy/grammy.service';
import config from 'src/shared/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      envFilePath: '../.env',
    }),
    AuthModule,
    TokensModule,
    EventsModule,
  ],
  controllers: [],
  providers: [GrammyService],
})
export class AppModule {}
