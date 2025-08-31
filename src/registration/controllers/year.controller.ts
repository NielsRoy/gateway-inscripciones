import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateYearDto } from '../dto/year/create-year.dto';
import { UpdateYearDto } from '../dto/year/update-year.dto';

@ApiTags('Gestión')
@Controller('year')
export class YearController {
  //constructor(private readonly studentService: StudentService) {}
  
  @Post()
  create(@Body() createYearDto: CreateYearDto) {
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
  update(@Param('number', ParseIntPipe) number: number, @Body() updateYearDto: UpdateYearDto) {
    return `This action updates a #${number} building`;
  }

  @Delete(':number')
  remove(@Param('number', ParseIntPipe) number: number) {
    return `This action removes a #${number} building`;
  }
}
