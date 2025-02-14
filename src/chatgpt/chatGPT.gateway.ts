import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as WebSocket from 'ws';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class chatGPTGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private openAIWs: WebSocket;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: Socket) {
    console.log('Cliente conectado:', client.id);
    this.connectToOpenAI();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado:', client.id);
    if (this.openAIWs) {
      this.openAIWs.close();
    }
  }

  private connectToOpenAI() {
    const url =
      'wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17';
    this.openAIWs = new WebSocket(url, {
      headers: {
        Authorization: 'Bearer ' + process.env.OPENAI_API_KEY,
        'OpenAI-Beta': 'realtime=v1',
      },
    });

    this.openAIWs.on('open', () => {
      console.log('Conectado a OpenAI');
    });

    this.openAIWs.on('message', (message: any) => {
      const data = JSON.parse(message.toString());
      this.server.emit('chatgpt_response', data.response);
    });
  }

  @SubscribeMessage('send_message')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleMessage(client: Socket, @MessageBody() data: string): void {
    const event = {
      type: 'conversation.item.create',
      response: {
        modalities: ['audio', 'text'],
        instructions: data,
      },
    };
    //console.log(JSON.stringify(event));
    this.openAIWs.send(JSON.stringify(event));
  }
}
