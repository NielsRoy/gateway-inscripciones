import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { StudyPlanModule } from './study-plan/study-plan.module';
import { TransportModule } from './transport.module';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [
    StudentModule,
    StudyPlanModule,
    TransportModule,
    EnrollmentModule,
  ],
})
export class AppModule {}
