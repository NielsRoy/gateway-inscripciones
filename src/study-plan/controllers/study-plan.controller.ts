import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudyPlanService } from '../study-plan.service';
import { CreateStudyPlanDto } from '../dto/create-study-plan.dto';
import { UpdateStudyPlanDto } from '../dto/update-study-plan.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Plan de estudio')
@Controller('study-plan')
export class StudyPlanController {
  constructor(private readonly studyPlanService: StudyPlanService) {}

  @Post()
  create(@Body() createStudyPlanDto: CreateStudyPlanDto) {
    return this.studyPlanService.create(createStudyPlanDto);
  }

  @Get()
  findAll() {
    return this.studyPlanService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.studyPlanService.findOne(+code);
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateStudyPlanDto: UpdateStudyPlanDto) {
    return this.studyPlanService.update(+code, updateStudyPlanDto);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.studyPlanService.remove(+code);
  }
}
