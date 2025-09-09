import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  
  constructor() {}

  @Get('seed')
  runSeed() {
    //return this.client.send('seed_database', 'hola'); 
  }

  @Post('sum')
  getSum(@Body() nums) {
    //return this.client.send({ cmd: 'get_sum' }, nums); 
  }

  @Get('study-plan/:code/subjects')
  getSubjects(@Param('code') code: string) {
    //return this.client.send({ cmd: 'get_study_plan_subjects' }, { code });
  }
}
