import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from '@app/common/database/type-orm/abstract.entity';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;

  constructor(
    private readonly entityRepository: Repository<T>,
    private readonly entityManager: EntityManager,
  ) {}

  protected async create(entity: T): Promise<T> {
    return this.entityRepository.save(entity);
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T | null> {
    const entity = await this.entityRepository.findOne({ where });

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', where);
      throw new NotFoundException('Document was not found with filterQuery');
    }

    return entity;
  }

  async find(where: FindOptionsWhere<T>): Promise<T[]> {
    return await this.entityRepository.find({});
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T | null> {
    const document = await this.entityRepository.update(where, partialEntity);

    if (!document.affected) {
      this.logger.warn('Document was not found with filterQuery', where);
      throw new NotFoundException('Document was not found with filterQuery');
    }

    return await this.entityRepository.findOne({ where });
  }

  async findOneAndDelete(where: FindOptionsWhere<T>) {
    return this.entityRepository.delete(where);
  }
}
