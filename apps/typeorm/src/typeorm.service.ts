import { Injectable } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { TypeOrmRepository } from './typeorm.repository';

@Injectable()
export class TypeormService {
  constructor(private readonly typeOrmRepository: TypeOrmRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(createDto: CreateDto) {
    await this.typeOrmRepository.create({
      ...createDto,
      id: 123,
    });
  }
}
