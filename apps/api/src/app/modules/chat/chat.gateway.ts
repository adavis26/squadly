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
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'app/database/prisma.service';
import { Messages } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { CHAT, MESSAGE } from '../../../../../../libs/core/src/';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  public logger = new Logger(ChatGateway.name);

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

  @SubscribeMessage(MESSAGE.SEND)
  async handleSend(
    @MessageBody() message: MessageDTO,
    @ConnectedSocket() client: Socket
  ) {
    const responseMessage = await this.prismaService.messages.create({
      data: message,
    });

    await this.ws
      .to(`${CHAT.TEMPLATE}${message.chatId}`)
      .emit(MESSAGE.RECIEVE, responseMessage);
  }

  CHAT;
  @SubscribeMessage(CHAT.JOIN)
  async handleJoinChat(
    @MessageBody() payload: { chatId: number; userId: number },
    @ConnectedSocket() client: Socket
  ) {
    const pattern = `${CHAT.TEMPLATE}${payload.chatId}`;
    this.log(CHAT.JOIN, `user ${client.id} connecting to ${payload.chatId}`);
    await client.join(pattern);
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`User connected - ${client.id}`);
  }

  handleDisconnect(client) {
    this.logger.log(`User disconnected - ${client.id}`);
  }

  afterInit(ws: any) {
    console.log('Socket is live');
  }

  private log(pattern: string, msg: string) {
    this.logger.log(`[${pattern}] ${msg}`);
  }
}
