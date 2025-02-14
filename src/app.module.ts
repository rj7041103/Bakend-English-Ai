import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebSocketModule } from './socketio/websocket.module';
import { UserModule } from './features/Users/user.module';
import { AuthModule } from './features/Auth/auth.module';
/* import { chatGPTModule } from './chatgpt/chatGPT.module';
 */ import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    /* chatGPTModule, */
    WebSocketModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
