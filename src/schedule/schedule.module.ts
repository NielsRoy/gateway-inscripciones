import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './controllers/schedule.controller';
import { BuildingController } from './controllers/building.controller';
import { ClassroomController } from './controllers/classroom.controller';
import { ProcessorModule } from 'src/processor.module';

@Module({
  controllers: [ScheduleController, BuildingController, ClassroomController],
  providers: [ScheduleService],
  imports: [ProcessorModule],
})
export class ScheduleModule {}
