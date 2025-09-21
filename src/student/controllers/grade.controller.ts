import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGradeDto } from '../dto/create-grade.dto';
import { UpdateGradeDto } from '../dto/update-grade.sto';
import { ProcessorService } from 'src/processor.service';
import { HttpMethod } from 'src/common/interfaces/processor.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import type { Request } from 'express';

@ApiTags('Calificación')
@Controller('grade')
export class GradeController {
  
  constructor(private readonly processorService: ProcessorService) {}
  
  @Post()
  create(
    @Req() req: Request,
    @Body() createGradeDto: CreateGradeDto, 
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { registrationDetailId, studentId, ...rest } = createGradeDto;
    const payload = {
      method: HttpMethod.POST,
      entity: 'Grade',
      body: { ...rest, registrationDetail: { id: registrationDetailId }, student: { id: studentId } },
      hash,
      responseHash,
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(payload, async, responseHash);
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
      entity: 'Grade',
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
      entity: 'Grade',
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
    @Body() updateGradeDto: UpdateGradeDto,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { registrationDetailId, studentId, ...rest } = updateGradeDto;
    const payload = {
      method: HttpMethod.PATCH,
      entity: 'Grade',
      body: { id, ...rest, registrationDetail: { id: registrationDetailId }, student: { id: studentId } },
      hash,
      responseHash,
      replyTo: 'http://localhost:3000/api/reply',
    };
    
    return this.processorService.handleRequest(payload, async, responseHash);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return `This action removes a #${id} grade`;
  // }
}
