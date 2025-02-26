import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TestService } from './test.service';
import { Test } from '@prisma/client';
@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getTest(): Promise<Test[]> {
    return this.testService.getTest();
  }
  @Post()
  @HttpCode(HttpStatus.OK)
  async createTest(@Body() test: Test): Promise<Test> {
    return this.testService.createTest(test);
  }
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTest(@Param('id') id: string, @Body() test: Test) {
    return this.testService.updateTest(id, test);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteTest(@Param('id') id: string) {
    return this.testService.deleteTest(id);
  }
}
