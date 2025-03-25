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
import { RearrangeSentences } from '@prisma/client';
import { RearrangeSentencesService } from './RearrangeSentences.service';
@Controller('rearrange')
export class RearrangeController {
  constructor(private rearrangeSentencesService: RearrangeSentencesService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getTest(): Promise<RearrangeSentences[]> {
    return this.rearrangeSentencesService.getRearrangeSentences();
  }
  @Post()
  @HttpCode(HttpStatus.OK)
  async createTest(
    @Body() rearrange: RearrangeSentences,
  ): Promise<RearrangeSentences> {
    return this.rearrangeSentencesService.createRearrangeSentences(rearrange);
  }
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTest(
    @Param('id') id: string,
    @Body() rearrange: RearrangeSentences,
  ) {
    return this.rearrangeSentencesService.updateRearrangeSentences(
      id,
      rearrange,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteTest(@Param('id') id: string) {
    return this.rearrangeSentencesService.deleteRearrangeSentences(id);
  }
}
