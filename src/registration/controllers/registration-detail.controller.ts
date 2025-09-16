import { Controller, Get, Post, Body, Patch, Param, Delete, Req, DefaultValuePipe, Query, ParseBoolPipe, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProcessorService } from 'src/processor.service';
import { HttpMethod } from 'src/common/interfaces/processor.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import type { Request } from 'express';
import { CreateRegistrationDetailDto } from '../dto/registration-detail/create-registration-detail.dto';
import { UpdateRegistrationDetailDto } from '../dto/registration-detail/update-registration-detail.dto';

@ApiTags('Inscripción Detalle')
@Controller('registration-detail')
export class RegistrationDetailController {
  
  constructor(private readonly processorService: ProcessorService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createRegistrationDetailDto: CreateRegistrationDetailDto, 
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { registrationId, subjectGroupId } = createRegistrationDetailDto;
    const payload = {
      method: HttpMethod.POST,
      entity: 'RegistrationDetail',
      body: { registration: { id: registrationId }, subjectGroup: { id: subjectGroupId } },
      hash,
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
      entity: 'RegistrationDetail',
      hash,
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
      entity: 'RegistrationDetail',
      hash,
      body: { id },
      replyTo: 'http://localhost:3000/api/reply',
    };

    return this.processorService.handleRequest(payload, async, responseHash);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRegistrationDetailDto: UpdateRegistrationDetailDto,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { registrationId, subjectGroupId } = updateRegistrationDetailDto;
    const payload = {
      method: HttpMethod.PATCH,
      entity: 'RegistrationDetail',
      body: { id, registration: { id: registrationId }, subjectGroup: { id: subjectGroupId } },
      hash,
      async,
      replyTo: 'http://localhost:3000/api/reply',
    };
    
    return this.processorService.handleRequest(payload, async, responseHash);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.registrationService.remove(+id);
  // }
}
