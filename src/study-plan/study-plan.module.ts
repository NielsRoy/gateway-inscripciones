import { Module } from '@nestjs/common';
import { StudyPlanService } from './study-plan.service';
import { StudyPlanController } from './controllers/study-plan.controller';
import { CareerController } from './controllers/career.controller';
import { SubjectController } from './controllers/subject.controller';
import { PlanSubjectController } from './controllers/plan-subject.controller';
import { PrerequisiteController } from './controllers/prerequisite.controller';
import { LevelController } from './controllers/level.controller';
import { KafkaModule } from 'src/kafka.module';

@Module({
  controllers: [
    StudyPlanController,
    CareerController,
    SubjectController,
    PlanSubjectController,
    PrerequisiteController,
    LevelController,
  ],
  providers: [StudyPlanService],
  imports: [KafkaModule],
})
export class StudyPlanModule {}
