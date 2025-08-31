import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupScheduleDto } from '../dto/group-schedule/create-group-schedule.dto';
import { UpdateGroupScheduleDto } from '../dto/group-schedule/update-group-schedule.dto';

@ApiTags('Horario - Grupo')
@Controller('group-schedule')
export class GroupScheduleController {
  //constructor(private readonly studentService: StudentService) {}
  
  @Post()
  create(@Body() createGroupScheduleDto: CreateGroupScheduleDto) {
    return 'This action adds a new career';
  }

  @Get()
  findAll() {
    return `This action returns all career`;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `This action returns a #${id} career`;
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGroupScheduleDto: UpdateGroupScheduleDto) {
    return `This action updates a #${id} career`;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return `This action removes a #${id} career`;
  }
}
