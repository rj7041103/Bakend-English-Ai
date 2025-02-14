import { Module } from '@nestjs/common';
import { chatGPTGateway } from './chatGPT.gateway';

@Module({
  providers: [chatGPTGateway],
})
export class chatGPTModule {}
