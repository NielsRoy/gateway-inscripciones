import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MATH_SERVICE } from './config/services';
import { envs } from './config/env';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { StudyPlanModule } from './study-plan/study-plan.module';

@Module({
  imports: [
    ClientsModule.register([
      { 
        name: MATH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.mathMicroserviceHost,
          port: envs.mathMicroservicePort,
        }
      },
    ]),
    TeacherModule,
    StudentModule,
    StudyPlanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
