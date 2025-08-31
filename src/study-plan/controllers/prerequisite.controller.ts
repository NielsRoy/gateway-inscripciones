import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrerequisiteDto } from '../dto/prerequisite/prerequisite.dto';
//import { UpdatePrerequisiteDto } from '../dto/prerequisite/update-prerequisite.dto';

@ApiTags('Prerequisito')
@Controller('prerequisite')
export class PrerequisiteController {
  //constructor(private readonly studentService: StudentService) {}
  
  @Post()
  create(@Body() prerequisiteDto: PrerequisiteDto) {
    return 'This action adds a new career';
  }

  @Get()
  findAll() {
    return `This action returns all career`;
  }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return `This action returns a #${id} career`;
  // }

  // @Patch(':id')
  // update(@Param('id', ParseIntPipe) id: number, @Body() updatePrerequisiteDto: UpdatePrerequisiteDto) {
  //   return `This action updates a #${id} career`;
  // }

  @Delete()
  remove(@Body() prerequisiteDto: PrerequisiteDto) {
    return `This action removes a prerequisite`;
  }
}
