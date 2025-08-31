import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCareerDto } from '../dto/career/create-career.dto';
import { UpdateCareerDto } from '../dto/career/update-career.dto';

@ApiTags('Carrera')
@Controller('career')
export class CareerController {
  //constructor(private readonly studentService: StudentService) {}
  
  @Post()
  create(@Body() createCareerDto: CreateCareerDto) {
    return 'This action adds a new career';
  }

  @Get()
  findAll() {
    return `This action returns all career`;
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return `This action returns a #${code} career`;
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateCareerDto: UpdateCareerDto) {
    return `This action updates a #${code} career`;
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return `This action removes a #${code} career`;
  }
}
