import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebSocketModule } from './socketio/websocket.module';
import { UserModule } from './features/Users/user.module';
import { AuthModule } from './features/Auth/auth.module';
import { chatGPTModule } from './chatgpt/chatGPT.module';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from './features/Test/test.module';
import { RearrangeModule } from './features/RearrangeSentences/RearrangeSentences.module';
@Module({
  imports: [
    chatGPTModule,
    WebSocketModule,
    UserModule,
    AuthModule,
    TestModule,
    RearrangeModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
