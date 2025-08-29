import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Conversation } from './conversation.schema';
import { User } from '../../users/schemas/user.schema';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, ref: Conversation.name, required: true })
  conversation: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  sender: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  read: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
