import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSubjectGroupDto } from '../dto/subject-group/create-subject-group.dto';
import { UpdateSubjectGroupDto } from '../dto/subject-group/update-subject-group.dto';

@ApiTags('Grupo - Materia')
@Controller('subject-group')
export class SubjectGroupController {
  //constructor(private readonly studentService: StudentService) {}
  
  @Post()
  create(@Body() createSubjectGroupDto: CreateSubjectGroupDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSubjectGroupDto: UpdateSubjectGroupDto) {
    return `This action updates a #${id} career`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return `This action removes a #${id} career`;
  }
}
