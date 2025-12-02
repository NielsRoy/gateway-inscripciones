import { Module } from '@nestjs/common';
import { TransportModule } from '../transport.module';
import { StudyPlanController } from './controllers/study-plan.controller';

@Module({
  controllers: [StudyPlanController],
  imports: [TransportModule],
})
export class StudyPlanModule { }
