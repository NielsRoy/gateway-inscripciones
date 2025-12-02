import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { StudyPlanModule } from './study-plan/study-plan.module';
import { TransportModule } from './transport.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    StudentModule,
    StudyPlanModule,
    TransportModule,
    EnrollmentModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
