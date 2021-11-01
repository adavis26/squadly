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
import { Socket } from 'dgram';
import { MessageDTO } from '../../../../../../libs/core/src/lib/interfaces';
import { ChatService } from './chat.service';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  constructor(private readonly chatService: ChatService) {}

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
    await this.chatService.saveMessage(message);
    this.ws.emit('message:recieve', message);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('User connected');
  }

  handleDisconnect(client: any) {
    console.log('User disconnected');
  }

  afterInit(ws: any) {
    console.log('Socket is live');
  }
}
