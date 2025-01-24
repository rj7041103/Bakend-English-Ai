import { Module } from '@nestjs/common';
import { WebsocketGateway } from './wesocket.gateway';

@Module({
  providers: [WebsocketGateway],
})
export class WebSocketModule {}
