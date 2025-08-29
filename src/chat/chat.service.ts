import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Conversation, ConversationDocument } from './schemas/conversation.schema';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async createConversation(participants: string[]): Promise<Conversation> {
    const conversation = new this.conversationModel({ participants });
    return conversation.save();
  }

  async getConversations(userId: string): Promise<Conversation[]> {
    return this.conversationModel.find({ participants: userId }).exec();
  }

  async sendMessage(conversationId: string, senderId: string, content: string): Promise<Message> {
    const message = new this.messageModel({
      conversation: conversationId,
      sender: senderId,
      content,
    });
    await message.save();
    // Update lastMessageAt
    await this.conversationModel.findByIdAndUpdate(conversationId, { lastMessageAt: new Date() });
    return message;
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    return this.messageModel
      .find({ conversation: conversationId })
      .populate('sender', 'email username')
      .exec();
  }
}
