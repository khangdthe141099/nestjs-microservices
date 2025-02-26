import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); //Set white list sẽ chỉ cho phép những thuộc tính được định nghĩa trong DTO được gửi lên server
  app.useLogger(app.get(Logger));
  await app.listen(process.env.port ?? 3001);
}

bootstrap();
