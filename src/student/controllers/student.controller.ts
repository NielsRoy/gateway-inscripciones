import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { StudentService } from '../student.service';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Estudiante')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':code')
  findOne(@Param('code', ParseIntPipe) code: number) {
    return this.studentService.findOne(code);
  }

  @Patch(':code')
  update(@Param('code', ParseIntPipe) code: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(code, updateStudentDto);
  }

  @Delete(':code')
  remove(@Param('code', ParseIntPipe) code: number) {
    return this.studentService.remove(code);
  }
}
