import { Module } from '@nestjs/common';
import { chatGPTGateway } from './chatGPT.gateway';
import { chatGPTController } from './chatGpt.controller';

@Module({
  providers: [chatGPTGateway],
  controllers: [chatGPTController],
})
export class chatGPTModule {}
