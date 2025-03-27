import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  MinDate,
  ValidateNested,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateChargeDto } from './create-charge.dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType() //Mark graphql
export class CreateReservationDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  @Field() //Mark graphql
  startDate: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  @Field() //Mark graphql
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  @Field() //Mark graphql
  placeId: string;

  @IsString()
  @IsNotEmpty()
  @Field() //Mark graphql
  invoiceId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Field(() => CreateChargeDto) //Mark graphql
  charge: CreateChargeDto;
}
