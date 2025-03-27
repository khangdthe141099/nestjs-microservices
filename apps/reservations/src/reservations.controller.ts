import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post('create')
  async create(@Body() createReservationDto: CreateReservationDto) {
    return await this.reservationsService.create(createReservationDto);
  }

  // @MessagePattern('send-notification')
  // async sendNotification(@Body() body: { email: string }) {
  //   return await this.reservationsService.sendNotification(body.email);
  // }

  @Post('send-notification')
  async sendNotificationGRPC(@Body() body: { email: string }) {
    return await this.reservationsService.sendNotification(body.email);
  }

  @Get('all')
  async findAll() {
    return await this.reservationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reservationsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return await this.reservationsService.findOneAndUpdate(
      updateReservationDto,
      {
        _id: id,
      },
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.reservationsService.findOneAndDelete({ _id: id });
  }
}
