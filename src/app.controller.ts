import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { MATH_SERVICE } from './config/services';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject(MATH_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Get('hello')
  getHello() {
    return { message: "hello-world" };
  }

  @Get('seed')
  runSeed() {
    return this.client.send('seed_database', 'hola'); 
  }

  @Post('sum')
  getSum(@Body() nums) {
    return this.client.send({ cmd: 'get_sum' }, nums); 
  }

  @Get('study-plan/:code/subjects')
  getSubjects(@Param('code') code: string) {
    return this.client.send({ cmd: 'get_study_plan_subjects' }, { code });
  }
}
