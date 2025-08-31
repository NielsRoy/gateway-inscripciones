import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateLevelDto } from "../dto/level/create-level.dto";
import { UpdateLevelDto } from "../dto/level/update-level.dto";

@ApiTags('Nivel')
@Controller('level')
export class LevelController {

  //constructor(private readonly studentService: StudentService) {}
    
  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
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
  update(@Param('code') code: string, @Body() updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${code} career`;
  }

  @Delete(':code')
  remove(@Body() createLevelDto: CreateLevelDto) {
    return `This action removes a level`;
  }

}