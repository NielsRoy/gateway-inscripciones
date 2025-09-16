import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { StudyPlanService } from '../study-plan.service';
import { CreateStudyPlanDto } from '../dto/create-study-plan.dto';
import { UpdateStudyPlanDto } from '../dto/update-study-plan.dto';
import { ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { HttpMethod } from 'src/common/interfaces/processor.interface';
import { ProcessorService } from 'src/processor.service';

@ApiTags('Plan de estudio')
@Controller('study-plan')
export class StudyPlanController {
  constructor(private readonly processorService: ProcessorService) {}

  @Post()
  create(@Body() createStudyPlanDto: CreateStudyPlanDto) {
    //return this.studyPlanService.create(createStudyPlanDto);
  }

  @Get()
  findAll(
    @Req() req: Request,
    @Query() paginationDto: PaginationDto,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { async } = paginationDto;
    const payload = {
      method: HttpMethod.GET,
      entity: 'StudyPlan',
      hash,
      paginationDto,
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(payload, async, responseHash);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    //return this.studyPlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudyPlanDto: UpdateStudyPlanDto) {
    //return this.studyPlanService.update(+id, updateStudyPlanDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.studyPlanService.remove(+id);
  // }
}
