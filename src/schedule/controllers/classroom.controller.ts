import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateClassroomDto } from '../dto/classroom/create-classroom.dto';
import { UpdateBuildingDto } from '../dto/building/update-building.dto';

@ApiTags('Aula')
@Controller('classroom')
export class ClassroomController {
  //constructor(private readonly studentService: StudentService) {}
  
  @Post()
  create(@Body() createClassroomDto: CreateClassroomDto) {
    return 'This action adds a new building';
  }

  @Get()
  findAll() {
    return `This action returns all building`;
  }

  @Get(':number')
  findOne(@Param('number', ParseIntPipe) number: number) {
    return `This action returns a #${number} building`;
  }

  @Patch(':number')
  update(@Param('number', ParseIntPipe) number: number, @Body() updateBuildingDto: UpdateBuildingDto) {
    return `This action updates a #${number} building`;
  }

  @Delete(':number')
  remove(@Param('number', ParseIntPipe) number: number) {
    return `This action removes a #${number} building`;
  }
}
