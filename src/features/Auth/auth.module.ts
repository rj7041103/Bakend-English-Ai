import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma-client/prisma.module';
import { PrismaService } from 'src/core/prisma-client/prisma.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../Users/user.module';
import { jwtConstants } from './auth.constant';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
