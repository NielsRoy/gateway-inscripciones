import { Module } from '@nestjs/common';
import { StudyPlanService } from './study-plan.service';
import { StudyPlanController } from './controllers/study-plan.controller';
import { CareerController } from './controllers/career.controller';
import { SubjectController } from './controllers/subject.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MATH_SERVICE } from 'src/config/services';
import { envs } from 'src/config/env';

@Module({
  controllers: [StudyPlanController, CareerController, SubjectController],
  providers: [StudyPlanService],
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
  ],
})
export class StudyPlanModule {}
