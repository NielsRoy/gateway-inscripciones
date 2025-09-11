import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req } from '@nestjs/common';
import { StudentService } from '../student.service';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { ApiTags } from '@nestjs/swagger';
import { HttpMethod, KafkaService } from 'src/kafka.service';
import type { Request } from 'express';

@ApiTags('Estudiante')
@Controller('student')
export class StudentController {
  constructor(
    private readonly kafkaService: KafkaService,
  ) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto, @Req() req: Request) {
    const hash = (req as any).hash;

    return this.kafkaService.emit({
      method: HttpMethod.POST,
      entity: 'Student',
      body: createStudentDto,
      hash,
      replyTo: 'http://localhost:3000/api/reply',
    });
  }

  @Get()
  findAll(@Req() req: Request) {
    const hash = (req as any).hash;

    return this.kafkaService.emit({
      method: HttpMethod.GET,
      entity: 'Student',
      hash,
      replyTo: 'http://localhost:3000/api/reply',
    });
  }

  @Get(':code')
  findOne(@Param('code', ParseIntPipe) code: number) {
    //return this.studentService.findOne(code);
  }

  @Patch(':code')
  update(@Param('code', ParseIntPipe) code: number, @Body() updateStudentDto: UpdateStudentDto, @Req() req: Request) {
    const hash = (req as any).hash;

    return this.kafkaService.emit({
      method: HttpMethod.PATCH,
      entity: 'Student',
      body: { code, ...updateStudentDto },
      hash,
      replyTo: 'http://localhost:3000/api/reply',
    })
  }

  // @Delete(':code')
  // remove(@Param('code', ParseIntPipe) code: number) {
  //   return this.studentService.remove(code);
  // }
}
