import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { StudentService } from '../student.service';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpMethod, KafkaService } from 'src/kafka.service';

@ApiTags('Estudiante')
@Controller('student')
export class StudentController {
  constructor(
    private readonly kafkaService: KafkaService,
  ) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.kafkaService.send({
      method: HttpMethod.POST,
      entity: 'Student',
      body: createStudentDto,
    });
  }

  @Get()
  findAll() {
    return this.kafkaService.send({
      method: HttpMethod.GET,
      entity: 'Student',
    });
  }

  @Get(':code')
  findOne(@Param('code', ParseIntPipe) code: number) {
    //return this.studentService.findOne(code);
  }

  @Patch(':code')
  update(@Param('code', ParseIntPipe) code: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.kafkaService.send({
      method: HttpMethod.PATCH,
      entity: 'Student',
      body: { code, ...updateStudentDto }
    })
  }

  // @Delete(':code')
  // remove(@Param('code', ParseIntPipe) code: number) {
  //   return this.studentService.remove(code);
  // }
}
