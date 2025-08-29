import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true, unique: true })
  user: Types.ObjectId; // relasi one-to-one ke User

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  zodiac: string;

  @Prop()
  horoscope: string;

  @Prop()
  birthDate: Date;

  @Prop()
  bio: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
