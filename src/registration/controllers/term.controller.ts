import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTermDto } from '../dto/term/create-term.dto';
import { UpdateTermDto } from '../dto/term/update-term.dto';
import { ProcessorService } from 'src/processor.service';
import { HttpMethod } from 'src/common/interfaces/processor.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import type { Request } from 'express';
import { KAFKA_REGISTRATION_TOPIC } from 'src/config/services';

@ApiTags('Gestión')
@Controller('term')
export class TermController {

  constructor(private readonly processorService: ProcessorService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createTermDto: CreateTermDto,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const payload = {
      method: HttpMethod.POST,
      entity: 'Term',
      body: createTermDto,
      hash,
      responseHash,
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
      entity: 'Term',
      hash,
      responseHash,
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
      entity: 'Term',
      hash,
      responseHash,
      body: { id },
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(payload, async, responseHash, KAFKA_REGISTRATION_TOPIC);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTermDto: UpdateTermDto,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const payload = {
      method: HttpMethod.PATCH,
      entity: 'Term',
      body: { id, ...updateTermDto },
      hash,
      responseHash,
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(payload, async, responseHash, KAFKA_REGISTRATION_TOPIC);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: id) {
  //   return `This action removes a #${id} building`;
  // }
}
