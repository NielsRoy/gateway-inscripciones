import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KafkaService } from './kafka.service';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { StudyPlanModule } from './study-plan/study-plan.module';
import { ScheduleModule } from './schedule/schedule.module';
import { RegistrationModule } from './registration/registration.module';
import { KafkaModule } from './kafka.module';

@Module({
  imports: [
    TeacherModule,
    StudentModule,
    StudyPlanModule,
    ScheduleModule,
    RegistrationModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
