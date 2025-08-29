import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('send_message')
  async handleMessage(@MessageBody() data: { conversationId: string; senderId: string; content: string }) {
    const message = await this.chatService.sendMessage(data.conversationId, data.senderId, data.content);
    // Emit ke semua client peserta conversation
    this.server.emit(`message_${data.conversationId}`, message);
  }
}
