import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'user',
})
export class UserDocument extends AbstractDocument {
  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
