import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { StudyPlanModule } from './study-plan/study-plan.module';
import { ProcessorModule } from './processor.module';
import { CommonModule } from './common/common.module';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [
    StudentModule,
    StudyPlanModule,
    ProcessorModule,
    CommonModule,
    EnrollmentModule,
  ],
})
export class AppModule {}
