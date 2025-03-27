import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import {
  NOTIFICATIONS_PACKAGE_NAME,
  NOTIFICATIONS_SERVICE,
  NOTIFICATIONS_SERVICE_NAME,
  NotificationsServiceClient,
  PAYMENTS_SERVICE,
} from '@app/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService implements OnModuleInit {
  // [gRPC]:
  // private notificationGrpcService: NotificationsServiceClient;

  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    // [TCP & RabbitMQ]
    @Inject(PAYMENTS_SERVICE) private paymentsService: ClientProxy,
    @Inject(NOTIFICATIONS_SERVICE) private notificationsService: ClientProxy,
    // [gRPC]:
    // @Inject(NOTIFICATIONS_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    // this.notificationGrpcService =
    //   this.client.getService<NotificationsServiceClient>(
    //     NOTIFICATIONS_SERVICE_NAME,
    //   );
  }

  async create(createReservationDto: CreateReservationDto) {
    this.paymentsService
      .send('create_charge', createReservationDto.charge)
      .pipe(
        map(async (res) => {
          return await this.reservationsRepository.create({
            ...createReservationDto,
            invoiceId: res.id,
            userId: '123',
          });
        }),
      );
  }

  // [TCP & RabbitMQ]
  async sendNotification(email: string) {
    this.notificationsService.emit('notify_email', { email });
  }

  // [gRPC]:
  // async sendNotificationGRPC(email: string) {
  //   this.notificationGrpcService.notifyEmail({ email }).subscribe(() => {});
  // }

  async findOne(id: string) {
    return await this.reservationsRepository.findOne({ _id: id });
  }

  async findAll(filterQuery = {}) {
    return await this.reservationsRepository.find(filterQuery);
  }

  async findOneAndUpdate(update: UpdateReservationDto, filterQuery = {}) {
    return await this.reservationsRepository.findOneAndUpdate(
      filterQuery,
      update,
    );
  }

  async findOneAndDelete(filterQuery = {}) {
    return await this.reservationsRepository.findOneAndDelete(filterQuery);
  }
}
