import { ConflictException, Injectable } from '@nestjs/common';
import { Test } from '@prisma/client';
import { PrismaService } from 'src/core/prisma-client/prisma.service';
@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}
  getTest(): Promise<Test[]> {
    return this.prisma.test.findMany();
  }

  async createTest(data: Test): Promise<Test> {
    const existQuestion = await this.prisma.test.findUnique({
      where: { question: data.question },
    });
    if (existQuestion) {
      throw new ConflictException('La pregunta ya existe');
    }
    return await this.prisma.test.create({ data });
  }

  deleteTest(id: string): Promise<Test> {
    return this.prisma.test.delete({ where: { id } });
  }

  updateTest(id: string, data: Test): Promise<Test> {
    return this.prisma.test.update({ where: { id }, data });
  }
}
