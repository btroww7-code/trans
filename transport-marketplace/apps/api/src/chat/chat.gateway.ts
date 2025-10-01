import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({ namespace: '/chat', cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async handleConnection(socket: Socket) {
    const token = socket.handshake.auth?.token;
    try {
      const user = this.jwtService.verify(token);
      socket.data.user = user;
    } catch {
      socket.disconnect();
    }
  }

  async handleDisconnect(socket: Socket) {
    // ...handle disconnect logic...
  }

  @SubscribeMessage('join_conversation')
  async onJoinConversation(@MessageBody() data: { conversation_id: string }, @ConnectedSocket() socket: Socket) {
    socket.join(data.conversation_id);
  }

  @SubscribeMessage('leave_conversation')
  async onLeaveConversation(@MessageBody() data: { conversation_id: string }, @ConnectedSocket() socket: Socket) {
    socket.leave(data.conversation_id);
  }

  @SubscribeMessage('send_message')
  async onSendMessage(
    @MessageBody() data: { conversation_id: string; body: string },
    @ConnectedSocket() socket: Socket
  ) {
    const user = socket.data.user;
    const message = await this.prisma.message.create({
      data: {
        conversation_id: data.conversation_id,
        sender_id: user.id,
        body: data.body,
      },
    });
    socket.to(data.conversation_id).emit('new_message', message);
    // ...queue notification if offline...
    return message;
  }

  @SubscribeMessage('typing')
  async onTyping(@MessageBody() data: { conversation_id: string }, @ConnectedSocket() socket: Socket) {
    socket.to(data.conversation_id).emit('typing', { user_id: socket.data.user.id });
  }

  @SubscribeMessage('mark_read')
  async onMarkRead(@MessageBody() data: { message_id: string }, @ConnectedSocket() socket: Socket) {
    await this.prisma.message.update({
      where: { id: data.message_id },
      data: { read_at: new Date() },
    });
    // Optionally emit read receipt
  }
}
  }
}
