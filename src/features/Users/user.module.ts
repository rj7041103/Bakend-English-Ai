import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/core/prisma-client/prisma.module';
import { UsersController } from './user.controller';
import { PrismaService } from 'src/core/prisma-client/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService, PrismaService],
  controllers: [UsersController],
})
export class UserModule {}
