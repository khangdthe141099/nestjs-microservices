import { NestFactory } from '@nestjs/core';
import { TypeormModule } from './typeorm.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(TypeormModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3004);
}

bootstrap();
