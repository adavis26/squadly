import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessageDTO } from '../../../../../../libs/core/src/lib/interfaces';
import { ChatService } from './chat.service';
import { Client, Server, Socket } from 'socket.io';
import { PrismaService } from 'app/database/prisma.service';
import { Messages } from '@prisma/client';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  constructor(
    private readonly chatService: ChatService,
    private readonly prismaService: PrismaService
  ) {}

  @WebSocketServer()
  ws: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string) {
    this.ws.emit('events', data);
  }

  @SubscribeMessage('message:send')
  async handleSend(
    @MessageBody() message: MessageDTO,
    @ConnectedSocket() client: Socket
  ) {
    console.log(message);
    const responseMessage = await this.prismaService.messages.create({
      data: message,
    });
    await this.ws.emit('message:recieve', responseMessage);
  }

  @SubscribeMessage('chat:join')
  async handleJoinChat(
    @MessageBody() payload: { chatId: number; userId: number },
    @ConnectedSocket() client: Socket
  ) {
    const room = await client.join(`chat:${payload.chatId}`);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`User connected - ${client.id}`);
  }

  handleDisconnect(client: Client) {
    console.log(`User disconnected - ${client.id}`);
  }

  afterInit(ws: any) {
    console.log('Socket is live');
  }
}
