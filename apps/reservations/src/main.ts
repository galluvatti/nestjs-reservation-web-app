import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations/reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  // Enable validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //Enable logger from nestjs-pino
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
