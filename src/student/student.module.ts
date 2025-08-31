import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './controllers/student.controller';
import { GradeController } from './controllers/grade.controller';

@Module({
  controllers: [StudentController, GradeController,],
  providers: [StudentService],
})
export class StudentModule {}
