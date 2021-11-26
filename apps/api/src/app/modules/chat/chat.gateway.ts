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
    const responseMessage = await this.chatService.saveMessage(message);
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
