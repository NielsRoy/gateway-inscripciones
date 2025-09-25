import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePeriodDto } from '../dto/period/create-period.dto';
import { UpdatePeriodDto } from '../dto/period/update-period.dto';
import { ProcessorService } from 'src/processor.service';
import { HttpMethod } from 'src/common/interfaces/processor.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import type { Request } from 'express';
import { KAFKA_REGISTRATION_TOPIC } from 'src/config/services';

@ApiTags('Periodo')
@Controller('period')
export class PeriodController {

  constructor(private readonly processorService: ProcessorService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createPeriodDto: CreatePeriodDto,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { termId, ...rest } = createPeriodDto;
    const payload = {
      method: HttpMethod.POST,
      entity: 'Period',
      body: { ...rest, term: { id: termId } },
      hash,
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(
      payload,
      async,
      responseHash,
      KAFKA_REGISTRATION_TOPIC,
    );
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
      entity: 'Period',
      hash,
      paginationDto,
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(
      payload,
      async,
      responseHash,
      KAFKA_REGISTRATION_TOPIC,
    );
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
      entity: 'Period',
      hash,
      body: { id },
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(
      payload,
      async,
      responseHash,
      KAFKA_REGISTRATION_TOPIC,
    );
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePeriodDto: UpdatePeriodDto,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { termId, ...rest } = updatePeriodDto;
    const payload = {
      method: HttpMethod.PATCH,
      entity: 'Period',
      body: { id, ...rest, term: { id: termId } },
      hash,
      async,
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(
      payload,
      async,
      responseHash,
      KAFKA_REGISTRATION_TOPIC,
    );
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: id) {
  //   return `This action removes a #${id} building`;
  // }
}
