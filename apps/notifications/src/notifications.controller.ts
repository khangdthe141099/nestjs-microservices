import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { NotificationsServiceController, NotificationsServiceControllerMethods } from '@app/common';

@Controller()
export class NotificationsController implements NotificationsServiceController {
  constructor(private readonly notificationsService: NotificationsService) {}

  //[TCP & RabbitMQ]
  @EventPattern("notify_email")
  async notifyEmail(@Payload() data: NotifyEmailDto) {
    await this.notificationsService.notifyEmail(data);
  }

  //[GRPC - not need event pattern]:
  // async notifyEmail(@Payload() data: NotifyEmailDto) {
  //   await this.notificationsService.notifyEmail(data);
  // }
}
