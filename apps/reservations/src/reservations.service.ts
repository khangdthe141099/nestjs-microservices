import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    return await this.reservationsRepository.create({
      ...createReservationDto,
      userId: '123',
    });
  }

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
