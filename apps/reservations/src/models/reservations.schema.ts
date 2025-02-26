import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'reservations_document',
})
export class ReservationsDocument extends AbstractDocument {
  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  userId: string;

  @Prop()
  placeId: string;

  @Prop()
  invoiceId: string;
}

export const ReservationsSchema =
  SchemaFactory.createForClass(ReservationsDocument);
