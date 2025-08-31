import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGradeDto } from '../dto/create-grade.dto';
import { UpdateGradeDto } from '../dto/update-grade.sto';

@ApiTags('Calificación')
@Controller('grade')
export class GradeController {
  //constructor(private readonly studentService: StudentService) {}
  
  @Post()
  create(@Body() createGradeDto: CreateGradeDto) {
    return 'This action adds a new grade';
  }

  @Get()
  findAll() {
    return `This action returns all grade`;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `This action returns a #${id} grade`;
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGradeDto: UpdateGradeDto) {
    return `This action updates a #${id} grade`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return `This action removes a #${id} grade`;
  }
}
