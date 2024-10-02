import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  // Enable validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //Enable logger from nestjs-pino
  app.useLogger(app.get(Logger));
  await app.listen(3001);
}
bootstrap();
