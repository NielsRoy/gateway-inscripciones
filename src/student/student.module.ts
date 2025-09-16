import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './controllers/student.controller';
import { GradeController } from './controllers/grade.controller';
import { ProcessorModule } from 'src/processor.module';

@Module({
  controllers: [StudentController, GradeController,],
  providers: [StudentService],
  imports: [ProcessorModule],
})
export class StudentModule {}
