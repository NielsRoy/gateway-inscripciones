import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePeriodDto } from '../dto/period/create-period.dto';
import { UpdatePeriodDto } from '../dto/period/update-period.dto';

@ApiTags('Periodo')
@Controller('period')
export class PeriodController {
  //constructor(private readonly studentService: StudentService) {}
  
  @Post()
  create(@Body() createPeriodDto: CreatePeriodDto) {
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
  update(@Param('number', ParseIntPipe) number: number, @Body() updatePeriodDto: UpdatePeriodDto) {
    return `This action updates a #${number} building`;
  }

  @Delete(':number')
  remove(@Param('number', ParseIntPipe) number: number) {
    return `This action removes a #${number} building`;
  }
}
