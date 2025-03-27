import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@app/common/database/type-orm/abstract.entity';

@Entity()
export class TypeOrmEntity extends AbstractEntity<TypeOrmEntity> {
  constructor(typeOrm: Partial<TypeOrmEntity>) {
    super(typeOrm);
  }

  @Column()
  timestamp: Date;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  userId: number;

  @Column()
  invoiceId: string;
}