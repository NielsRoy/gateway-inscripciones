import { Module } from '@nestjs/common';
import { ProcessorModule } from '../processor.module';
import { StudyPlanController } from './controllers/study-plan.controller';

@Module({
  controllers: [StudyPlanController],
  imports: [ProcessorModule],
})
export class StudyPlanModule { }
