import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSubjectGroupDto } from '../dto/subject-group/create-subject-group.dto';
import { UpdateSubjectGroupDto } from '../dto/subject-group/update-subject-group.dto';
import { ProcessorService } from 'src/processor.service';
import { HttpMethod } from 'src/common/interfaces/processor.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import type { Request } from 'express';
import { KAFKA_REGISTRATION_TOPIC } from 'src/config/services';

@ApiTags('Grupo - Materia')
@Controller('subject-group')
export class SubjectGroupController {

  constructor(private readonly processorService: ProcessorService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createSubjectGroupDto: CreateSubjectGroupDto,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { teacherId, planSubjectId, ...rest } = createSubjectGroupDto;
    const payload = {
      method: HttpMethod.POST,
      entity: 'SubjectGroup',
      body: { ...rest, teacher: { id: teacherId }, planSubject: { id: planSubjectId } },
      hash,
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(payload, async, responseHash, KAFKA_REGISTRATION_TOPIC);
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
      entity: 'SubjectGroup',
      hash,
      paginationDto,
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(payload, async, responseHash, KAFKA_REGISTRATION_TOPIC);
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
      entity: 'SubjectGroup',
      hash,
      body: { id },
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(payload, async, responseHash, KAFKA_REGISTRATION_TOPIC);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateSubjectGroupDto: UpdateSubjectGroupDto,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { teacherId, planSubjectId, ...rest } = UpdateSubjectGroupDto;
    const payload = {
      method: HttpMethod.PATCH,
      entity: 'SubjectGroup',
      body: { id, ...rest, teacher: { id: teacherId }, planSubject: { id: planSubjectId } },
      hash,
      async,
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(payload, async, responseHash, KAFKA_REGISTRATION_TOPIC);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return `This action removes a #${id} career`;
  // }
}
