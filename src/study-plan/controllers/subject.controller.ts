import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSubjectDto } from '../dto/subject/create-subject.dto';
import { UpdateSubjectDto } from '../dto/subject/update-subject.dto';
import { firstValueFrom } from 'rxjs';
import { HttpMethod, KafkaService } from 'src/kafka.service';

@ApiTags('Materia')
@Controller('subject')
export class SubjectController {
  
  constructor(
    private readonly kafkaService: KafkaService,
  ) {}
  
  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.kafkaService.send({
      method: HttpMethod.POST,
      entity: 'Subject',
      body: createSubjectDto,
    });
  }

  //findAllProducts(@Query() paginationDto: PaginationDto) {
  @Get()
  findAll() {
    return this.kafkaService.send({
      method: HttpMethod.GET,
      entity: 'Subject',
    });
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    //return this.subjectClient.send({ cmd: 'find_one_subject' }, { code });
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.kafkaService.send({
      method: HttpMethod.PATCH,
      entity: 'Subject',
      body: { code, ...updateSubjectDto }
    })
    //return this.subjectClient.send({ cmd: 'update_subject' },{ code, ...updateSubjectDto });
  }

  // @Delete(':code')
  // remove(@Param('code') code: string) {
  //   //return this.subjectClient.send({ cmd: 'delete_subject' }, { code });
  // }
}
