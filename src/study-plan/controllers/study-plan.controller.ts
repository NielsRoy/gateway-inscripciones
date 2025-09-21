import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, DefaultValuePipe, ParseBoolPipe, ParseIntPipe } from '@nestjs/common';
import { CreateStudyPlanDto } from '../dto/create-study-plan.dto';
import { UpdateStudyPlanDto } from '../dto/update-study-plan.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { HttpMethod } from 'src/common/interfaces/processor.interface';
import { ProcessorService } from 'src/processor.service';
import type { Request } from 'express';

@ApiTags('Plan de estudio')
@Controller('study-plan')
export class StudyPlanController {
  
  constructor(private readonly processorService: ProcessorService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createStudyPlanDto: CreateStudyPlanDto, 
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { careerId, ...rest } = createStudyPlanDto;
    const payload = {
      method: HttpMethod.POST,
      entity: 'StudyPlan',
      body: { ...rest, career: { id: careerId } },
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
      entity: 'StudyPlan',
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
      entity: 'StudyPlan',
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
    @Body() updateStudyPlanDto: UpdateStudyPlanDto,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { careerId, ...rest } = updateStudyPlanDto;
    const payload = {
      method: HttpMethod.PATCH,
      entity: 'StudyPlan',
      body: { id, ...rest, career: { id: careerId } },
      hash,
      responseHash,
      replyTo: 'http://localhost:3000/api/reply',
    };
    
    return this.processorService.handleRequest(payload, async, responseHash);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.studyPlanService.remove(+id);
  // }
}
