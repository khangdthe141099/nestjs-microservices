import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { NOTIFICATIONS_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);

  // [=== TCP ===]
  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     host: '0.0.0.0',
  //     port: 3004,
  //   },
  // });

  // // [=== RabbitMQ ===]
  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://rabbitmq:5672'],
  //     noAck: false,
  //     queue: 'notifications',
  //   },
  // });

  //[=== Redis ===]
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  // [=== GRPC ===]
  // app.connectMicroservice({
  //   transport: Transport.GRPC,
  //   options: {
  //     protoPath: join(__dirname, '../../../proto/notifications.proto'),
  //     package: NOTIFICATIONS_PACKAGE_NAME,
  //     url: 'dns:///notifications-service:40000',
  //   },
  // });

  await app.startAllMicroservices();
}

bootstrap();
