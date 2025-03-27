import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common/database/type-orm/abstract.repository';
import { ReservationsEntity } from '../typeorm/src/models/reservations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationsEntity> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectRepository(ReservationsEntity)
    reservationsRepository: Repository<ReservationsEntity>,
    reservationsManager: EntityManager,
  ) {
    super(reservationsRepository, reservationsManager);
  }
}
