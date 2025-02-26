import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3002,
    },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); //Set white list sẽ chỉ cho phép những thuộc tính được định nghĩa trong DTO được gửi lên server
  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
