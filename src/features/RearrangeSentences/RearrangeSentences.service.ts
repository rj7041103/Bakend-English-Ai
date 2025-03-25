import { ConflictException, Injectable } from '@nestjs/common';
import { RearrangeSentences } from '@prisma/client';
import { PrismaService } from 'src/core/prisma-client/prisma.service';
@Injectable()
export class RearrangeSentencesService {
  constructor(private prisma: PrismaService) {}
  getRearrangeSentences(): Promise<RearrangeSentences[]> {
    return this.prisma.rearrangeSentences.findMany();
  }

  async createRearrangeSentences(
    data: RearrangeSentences,
  ): Promise<RearrangeSentences> {
    const existQuestion = await this.prisma.rearrangeSentences.findUnique({
      where: { sentence: data.sentence },
    });
    if (existQuestion) {
      throw new ConflictException('La pregunta ya existe');
    }
    return await this.prisma.rearrangeSentences.create({ data });
  }

  deleteRearrangeSentences(id: string): Promise<RearrangeSentences> {
    return this.prisma.rearrangeSentences.delete({ where: { id } });
  }

  updateRearrangeSentences(
    id: string,
    data: RearrangeSentences,
  ): Promise<RearrangeSentences> {
    return this.prisma.rearrangeSentences.update({ where: { id }, data });
  }
}
