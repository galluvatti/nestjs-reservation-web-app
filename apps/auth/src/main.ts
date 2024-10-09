import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.connectMicroservice({ transport: Transport.TCP });
  // Enable Cookies parsing
  app.use(cookieParser());
  // Enable validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //Enable logger from nestjs-pino
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  app.startAllMicroservices();
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
