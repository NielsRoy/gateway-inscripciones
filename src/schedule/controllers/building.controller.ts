import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBuildingDto } from '../dto/building/create-building.dto';
import { UpdateBuildingDto } from '../dto/building/update-building.dto';

@ApiTags('Modulo')
@Controller('building')
export class BuildingController {
  //constructor(private readonly studentService: StudentService) {}
  
  @Post()
  create(@Body() createBuildingDto: CreateBuildingDto) {
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
