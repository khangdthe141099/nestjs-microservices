import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import {
  AUTH_SERVICE,
  DatabaseModule,
  LoggerModule,
  NOTIFICATIONS_SERVICE,
  PAYMENTS_SERVICE,
} from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ReservationsDocument,
  ReservationsSchema,
} from './models/reservations.schema';
import { ReservationsRepository } from './reservations.repository';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ReservationsResolver } from './reservations.resolver';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: ReservationsDocument.name,
        schema: ReservationsSchema,
      },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // [GraphQL]:
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    // [MICROSERVICES]:
    //Using TCP:
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'auth',
            port: 3002,
          },
        }),
      },
      {
        name: PAYMENTS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'payments',
            port: 3003,
          },
        }),
      },

      //[=== TCP ===]
      // {
      //   name: NOTIFICATIONS_SERVICE,
      //   useFactory: (configService: ConfigService) => ({
      //     transport: Transport.TCP,
      //     options: {
      //       host: 'notifications',
      //       port: 3004,
      //     },
      //   }),
      // },

      //[=== Rabbitmq ===]
      // {
      //   name: NOTIFICATIONS_SERVICE,
      //   useFactory: (configService: ConfigService) => ({
      //     transport: Transport.RMQ,
      //     options: {
      //       urls: ['amqp://rabbitmq:5672'],
      //       queue: 'notifications',
      //     },
      //   }),
      //   inject: [ConfigService],
      // },
      //[=== gRPC ===]
      // {
      //   name: NOTIFICATIONS_SERVICE,
      //   useFactory: (configService: ConfigService) => ({
      //     transport: Transport.GRPC,
      //     options: {
      //       package: NOTIFICATIONS_PACKAGE_NAME,
      //       protoPath: join(__dirname, '../../../proto/notifications.proto'),
      //       url: "notifications:5001",
      //     },
      //   }),
      //   inject: [ConfigService],
      // },
      //[=== REDIS ===]
      {
        name: NOTIFICATIONS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: 'localhost',
            port: 6379,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    ReservationsRepository,
    ReservationsResolver,
  ],
})
export class ReservationsModule {}
