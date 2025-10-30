import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req, Query, DefaultValuePipe, ParseBoolPipe, Inject } from '@nestjs/common';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProcessorService } from 'src/processor.service';
import { HttpMethod } from 'src/common/interfaces/processor.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import type { Request } from 'express';
import { PROCESSOR_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';

@ApiTags('Estudiante')
@Controller('student')
export class StudentController {

  constructor(
    private readonly processorService: ProcessorService,
    @Inject(PROCESSOR_SERVICE) private readonly processorClient: ClientProxy,
  ) {}

  @Post()
  create(
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return this.processorClient.send('register_student',createStudentDto);
  }

  // @Post()
  // create(
  //   @Req() req: Request,
  //   @Body() createStudentDto: CreateStudentDto,
  //   @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  // ) {
  //   const hash = (req as any).hash;
  //   const responseHash = (req as any).responseHash;
  //   const payload  = {
  //     method: HttpMethod.POST,
  //     entity: 'Student',
  //     body: createStudentDto,
  //     hash,
  //     responseHash,
  //     replyTo: 'http://localhost:3000/api/reply',
  //   };

  //   return this.processorService.handleRequest(payload, async, responseHash);
  // }

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
      entity: 'Student',
      hash,
      responseHash,
      paginationDto,
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(payload, async, responseHash);
  }

  @Get(':id')
  findOne(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const payload = {
      method: HttpMethod.GET,
      entity: 'Student',
      hash,
      responseHash,
      body: { id },
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(payload, async, responseHash);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,  //TODO: Quitar para mayor facilidad
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const payload = {
      method: HttpMethod.PATCH,
      entity: 'Student',
      body: { id, ...updateStudentDto },
      hash,
      responseHash,
      replyTo: 'http://localhost:3000/api/reply',
    };
    
    return this.processorService.handleRequest(payload, async, responseHash);
  }

  @Get(':id/subjects-for-enroll')
  getSubjectsForEnroll(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.processorClient.send('get_subjects_for_enroll', { studentId: id });
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.studentService.remove(id);
  // }
}
