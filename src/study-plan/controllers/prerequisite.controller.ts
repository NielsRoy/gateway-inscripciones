import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePrerequisiteDto } from '../dto/prerequisite/create-prerequisite.dto';
import { UpdatePrerequisiteDto } from '../dto/prerequisite/update-prerequisite.dto';
import { ProcessorService } from 'src/processor.service';
import { HttpMethod } from 'src/common/interfaces/processor.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import type { Request } from 'express';

@ApiTags('Prerequisito')
@Controller('prerequisite')
export class PrerequisiteController {

  constructor(private readonly processorService: ProcessorService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createPrerequisiteDto: CreatePrerequisiteDto,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { planSubjectId, prerequisiteId } = createPrerequisiteDto;
    const payload = {
      method: HttpMethod.POST,
      entity: 'Prerequisite',
      body: { planSubject: { id: planSubjectId }, prerequisitePlanSubject: { id: prerequisiteId } },
      hash,
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(payload, async, responseHash, KAFKA_STUDY_PLAN_TOPIC);
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
      entity: 'Prerequisite',
      hash,
      paginationDto,
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(payload, async, responseHash, KAFKA_STUDY_PLAN_TOPIC);
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
      entity: 'Prerequisite',
      hash,
      body: { id },
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(payload, async, responseHash, KAFKA_STUDY_PLAN_TOPIC);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePrerequisiteDto: UpdatePrerequisiteDto,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { planSubjectId, prerequisiteId } = updatePrerequisiteDto;
    const payload = {
      method: HttpMethod.PATCH,
      entity: 'Prerequisite',
      body: { id, planSubject: { id: planSubjectId }, prerequisitePlanSubject: { id: prerequisiteId } },
      hash,
      async,
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(payload, async, responseHash, KAFKA_STUDY_PLAN_TOPIC);
  }

  // @Delete()
  // remove(@Body() prerequisiteDto: PrerequisiteDto) {
  //   return `This action removes a prerequisite`;
  // }
}
