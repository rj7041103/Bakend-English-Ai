import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma-client/prisma.module';
import { PrismaService } from 'src/core/prisma-client/prisma.service';
import { TestService } from './test.service';
import { TestController } from './test.controller';

@Module({
  imports: [PrismaModule],
  providers: [TestService, PrismaService],
  controllers: [TestController],
})
export class TestModule {}
