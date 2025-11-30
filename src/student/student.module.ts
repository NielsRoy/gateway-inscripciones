import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { ProcessorModule } from '../processor.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from '../config/env';

@Module({
  controllers: [StudentController,],
  imports: [
    ProcessorModule,
    JwtModule.register({
      secret: envs.JWT_SECRET
    })
  ],
})
export class StudentModule {}
