import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSubjectDto } from '../dto/subject/create-subject.dto';
import { UpdateSubjectDto } from '../dto/subject/update-subject.dto';
import { firstValueFrom } from 'rxjs';
import { HttpMethod, KafkaService } from 'src/kafka.service';
import type { Request } from 'express';

@ApiTags('Materia')
@Controller('subject')
export class SubjectController {
  
  constructor(
    private readonly kafkaService: KafkaService,
  ) {}
  
  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto, @Req() req: Request) {
    const hash = (req as any).hash;

    return this.kafkaService.emit({
      method: HttpMethod.POST,
      entity: 'Subject',
      body: createSubjectDto,
      hash,
      replyTo: 'http://localhost:3000/api/reply',
    });
  }

  //findAllProducts(@Query() paginationDto: PaginationDto) {
  @Get()
  findAll(@Req() req: Request) {
    const hash = (req as any).hash;

    return this.kafkaService.emit({
      method: HttpMethod.GET,
      entity: 'Subject',
      hash,
      replyTo: 'http://localhost:3000/api/reply',
    });
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    //return this.subjectClient.send({ cmd: 'find_one_subject' }, { code });
  }
  
  @Patch(':code')
  update(@Param('code') code: string, @Body() updateSubjectDto: UpdateSubjectDto, @Req() req: Request) {
    const hash = (req as any).hash;

    return this.kafkaService.emit({
      method: HttpMethod.PATCH,
      entity: 'Subject',
      body: { code, ...updateSubjectDto },
      hash,
      replyTo: 'http://localhost:3000/api/reply',
    })
    //return this.subjectClient.send({ cmd: 'update_subject' },{ code, ...updateSubjectDto });
  }

  // @Delete(':code')
  // remove(@Param('code') code: string) {
  //   //return this.subjectClient.send({ cmd: 'delete_subject' }, { code });
  // }
}
