import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupScheduleDto } from '../dto/group-schedule/create-group-schedule.dto';
import { UpdateGroupScheduleDto } from '../dto/group-schedule/update-group-schedule.dto';
import { ProcessorService } from 'src/processor.service';
import { HttpMethod } from 'src/common/interfaces/processor.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import type { Request } from 'express';

@ApiTags('Horario - Grupo')
@Controller('group-schedule')
export class GroupScheduleController {
  
  constructor(private readonly processorService: ProcessorService) {}
  
  @Post()
  create(
    @Req() req: Request,
    @Body() createGroupScheduleDto: CreateGroupScheduleDto, 
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { scheduleId, dayId, subjectGroupId, classroomId } = createGroupScheduleDto;
    const payload = {
      method: HttpMethod.POST,
      entity: 'GroupSchedule',
      body: {
        schedule: { id: scheduleId },
        day: { id: dayId },
        subjectGroup: { id: subjectGroupId },
        classroom: { id: classroomId }
      },
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
      entity: 'GroupSchedule',
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
      entity: 'GroupSchedule',
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
    @Body() updateGroupScheduleDto: UpdateGroupScheduleDto,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { scheduleId, dayId, subjectGroupId, classroomId } = updateGroupScheduleDto;
    const payload = {
      method: HttpMethod.PATCH,
      entity: 'GroupSchedule',
      body: { id,
        schedule: { id: scheduleId },
        day: { id: dayId },
        subjectGroup: { id: subjectGroupId },
        classroom: { id: classroomId }
      },
      hash,
      responseHash,
      async,
      replyTo: 'http://localhost:3000/api/reply',
    };
    
    return this.processorService.handleRequest(payload, async, responseHash);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return `This action removes a #${id} career`;
  // }
}
