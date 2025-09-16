import { Controller, Get, Post, Body, Patch, Param, Delete, Req, DefaultValuePipe, Query, ParseBoolPipe, ParseIntPipe } from '@nestjs/common';
import { CreateRegistrationDto } from '../dto/create-registration.dto';
import { UpdateRegistrationDto } from '../dto/update-registration.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProcessorService } from 'src/processor.service';
import { HttpMethod } from 'src/common/interfaces/processor.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import type { Request } from 'express';

@ApiTags('Inscripción')
@Controller('registration')
export class RegistrationController {
  
  constructor(private readonly processorService: ProcessorService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createRegistrationDto: CreateRegistrationDto, 
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { studentId, periodId, ...rest } = createRegistrationDto;
    const payload = {
      method: HttpMethod.POST,
      entity: 'Registration',
      body: { ...rest, student: { id: studentId }, period: { id: periodId } },
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
      entity: 'Registration',
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
      entity: 'Registration',
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
    @Body() updateRegistrationDto: UpdateRegistrationDto,
    @Query('async', new DefaultValuePipe(true), ParseBoolPipe) async: boolean,
  ) {
    const hash = (req as any).hash;
    const responseHash = (req as any).responseHash;
    const { studentId, periodId, ...rest } = updateRegistrationDto;
    const payload = {
      method: HttpMethod.PATCH,
      entity: 'Registration',
      body: { id, ...rest, student: { id: studentId }, period: { id: periodId } },
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
