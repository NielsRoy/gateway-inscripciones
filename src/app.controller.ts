import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CacheService } from './cache.service';

@Controller()
export class AppController {
  
  constructor(
    private readonly cacheService: CacheService,
  ) {}

  // @Get('seed')
  // runSeed() {
  //   //return this.client.send('seed_database', 'hola'); 
  // }

  @Post('reply')
  handleReply(@Body() body) {
    this.cacheService.handleReply(body);
  }

  @Get('study-plan/:code/subjects')
  getSubjects(@Param('code') code: string) {
    //return this.client.send({ cmd: 'get_study_plan_subjects' }, { code });
  }
}
