import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
/* import { chatgpt } from 'src/features/ChatGpt/chatgpt';
 */ interface Room {
  userName: string;
  room: string;
  message: string;
  time: string | Date;
}
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  afterInit() {
    console.log('WebSocket server initialized');
  }
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    //this.server.emit('message', data);
    //chatgpt('di hola y presentate');
    client.broadcast.emit('message', data);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    console.log('Current Room: ' + room);
    client.join(`room_${room}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    console.log('Exit Room: ' + room);
    client.leave(`room_${room}`);
  }

  @SubscribeMessage('event_message')
  handleMessageRoom(client: Socket, data: Room) {
    //this.server.emit('message', data);
    //client.broadcast.to(`room_${data.room}`).emit('new_message', data);
    this.server.to(`room_${data.room}`).emit('new_message', data);
    //client.broadcast.to(`room_${room}`).emit('new_message', message);
  }
}
