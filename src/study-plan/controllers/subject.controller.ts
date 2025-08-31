import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSubjectDto } from '../dto/subject/create-subject.dto';
import { UpdateSubjectDto } from '../dto/subject/update-subject.dto';
import { MATH_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';

@ApiTags('Materia')
@Controller('subject')
export class SubjectController {
  
  constructor(
    @Inject(MATH_SERVICE) private readonly subjectClient: ClientProxy,
  ) {}
  
  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectClient.send(
      { cmd: 'create_subject' },
      createSubjectDto,
    );
  }

  //findAllProducts(@Query() paginationDto: PaginationDto) {
  @Get()
  findAll() {
    return this.subjectClient.send(
      { cmd: 'find_all_subjects' },
      {},
    );
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.subjectClient.send({ cmd: 'find_one_subject' }, { code });
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectClient.send({ cmd: 'update_subject' },{ code, ...updateSubjectDto });
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.subjectClient.send({ cmd: 'delete_subject' }, { code });
  }
}
