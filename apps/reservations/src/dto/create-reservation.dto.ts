import { Prop } from '@nestjs/mongoose';
import { IsDate, IsNotEmpty, IsString, MinDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateReservationDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  startDate: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
