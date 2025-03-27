import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common/database/type-orm/abstract.repository';
import { TypeOrmEntity } from './models/reservations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class TypeOrmRepository extends AbstractRepository<TypeOrmEntity> {
  protected readonly logger = new Logger(TypeOrmEntity.name);

  constructor(
    @InjectRepository(TypeOrmEntity)
    typeOrmRepository: Repository<TypeOrmEntity>,
    typeOrmManager: EntityManager,
  ) {
    super(typeOrmRepository, typeOrmManager);
  }
}
