import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreateChargeDto } from '../dto/create-charge.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  async createCharge(@Payload() data: CreateChargeDto) {
    return await this.paymentsService.createCharge(data);
  }
}
