import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('conversation')
  async createConversation(@Body() body: { participants: string[] }) {
    return this.chatService.createConversation(body.participants);
  }

  @Get('conversation/:userId')
  async getConversations(@Param('userId') userId: string) {
    return this.chatService.getConversations(userId);
  }

  @Post('message')
  async sendMessage(@Body() body: { conversationId: string; senderId: string; content: string }) {
    return this.chatService.sendMessage(body.conversationId, body.senderId, body.content);
  }

  @Get('message/:conversationId')
  async getMessages(@Param('conversationId') conversationId: string) {
    return this.chatService.getMessages(conversationId);
  }
}
