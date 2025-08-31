import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePlanSubjectDto } from '../dto/plan-subject/create-plan-subject.dto';
import { UpdatePlanSubjectDto } from '../dto/plan-subject/update-plan-subject.dto';

@ApiTags('Materia - Plan de estudio')
@Controller('plan-subject')
export class PlanSubjectController {
  //constructor(private readonly studentService: StudentService) {}
  
  @Post()
  create(@Body() createPlanSubjectDto: CreatePlanSubjectDto) {
    return 'This action adds a new career';
  }

  @Get()
  findAll() {
    return `This action returns all career`;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `This action returns a #${id} career`;
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePlanSubjectDto: UpdatePlanSubjectDto) {
    return `This action updates a #${id} career`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return `This action removes a #${id} career`;
  }
}
