import { Module } from '@nestjs/common';
import { TypeormController } from './typeorm.controller';
import { TypeormService } from './typeorm.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/common/database/type-orm/abstract.module';
import { TypeOrmEntity } from './models/reservations.entity';
import { TypeOrmRepository } from './typeorm.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([TypeOrmEntity]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [TypeormController],
  providers: [TypeormService, TypeOrmRepository],
})
export class TypeormModule {}
