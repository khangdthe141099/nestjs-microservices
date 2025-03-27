import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'reservations_document',
})
@ObjectType() //Mark graphql types
export class ReservationsDocument extends AbstractDocument {
  @Prop()
  @Field() //Mark graphql
  startDate: Date;

  @Prop()
  @Field() //Mark graphql
  endDate: Date;

  @Prop()
  @Field() //Mark graphql
  userId: string;

  @Prop()
  @Field() //Mark graphql
  placeId: string;

  @Prop()
  @Field() //Mark graphql
  invoiceId: string;
}

export const ReservationsSchema =
  SchemaFactory.createForClass(ReservationsDocument);
