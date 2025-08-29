import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }], required: true })
  participants: Types.ObjectId[]; // array of 2 userIds

  @Prop({ default: Date.now })
  lastMessageAt: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
