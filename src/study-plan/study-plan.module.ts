import { Module } from '@nestjs/common';
import { ProcessorModule } from 'src/processor.module';

@Module({
  controllers: [],
  imports: [ProcessorModule],
})
export class StudyPlanModule {}
