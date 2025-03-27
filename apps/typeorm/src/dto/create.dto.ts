import { IsDate, IsNumber, IsString, MinDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  timestamp: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  startDate: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  endDate: Date;

  @IsNumber()
  userId: number;

  @IsString()
  invoiceId: string;
}
