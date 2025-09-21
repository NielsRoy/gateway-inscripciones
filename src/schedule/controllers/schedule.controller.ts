import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req, DefaultValuePipe, ParseBoolPipe, Query } from '@nestjs/common';
import { ScheduleService } from '../schedule.service';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { UpdateScheduleDto } from '../dto/update-schedule.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProcessorService } from 'src/processor.service';
import { HttpMethod } from 'src/common/interfaces/processor.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import type { Request } from 'express';


@ApiTags('Horario')
@Controller('schedule')
export class ScheduleController {
  
  constructor(private readonly processorService: ProcessorService) {}
  
  @Post()
  create(
    @Req() req: Request,
    @Body() createScheduleDto: CreateScheduleDto, 
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const payload = {
      method: HttpMethod.POST,
      entity: 'Schedule',
      body: createScheduleDto,
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
      entity: 'Schedule',
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
      entity: 'Schedule',
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
    @Body() updateScheduleDto: UpdateScheduleDto,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const payload = {
      method: HttpMethod.PATCH,
      entity: 'Schedule',
      body: { id, ...updateScheduleDto },
      hash,
      responseHash,
      replyTo: 'http://localhost:3000/api/reply',
    };
    
    return this.processorService.handleRequest(payload, async, responseHash);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.scheduleService.remove(id);
  // }
}
