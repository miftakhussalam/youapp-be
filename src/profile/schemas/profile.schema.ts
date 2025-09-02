import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop()
  username: string;

  @Prop()
  name?: string;
  
  @Prop()
  zodiac?: string;

  @Prop()
  horoscope?: string;

  @Prop()
  birthday?: Date;

  @Prop()
  height?: number;

  @Prop()
  weight?: number;
  
  @Prop()
  interests?: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
