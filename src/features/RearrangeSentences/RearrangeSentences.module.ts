import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma-client/prisma.module';
import { PrismaService } from 'src/core/prisma-client/prisma.service';
import { RearrangeSentencesService } from './RearrangeSentences.service';
import { RearrangeController } from './RearrangeSentences.controller';

@Module({
  imports: [PrismaModule],
  providers: [RearrangeSentencesService, PrismaService],
  controllers: [RearrangeController],
})
export class RearrangeModule {}
