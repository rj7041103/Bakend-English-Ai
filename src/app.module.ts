import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebSocketModule } from './socketio/websocket.module';
import { UserModule } from './features/Users/user.module';
import { AuthModule } from './features/Auth/auth.module';

@Module({
  imports: [WebSocketModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
