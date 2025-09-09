import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './controllers/student.controller';
import { GradeController } from './controllers/grade.controller';
import { KafkaModule } from 'src/kafka.module';

@Module({
  controllers: [StudentController, GradeController,],
  providers: [StudentService],
  imports: [KafkaModule],
})
export class StudentModule {}
