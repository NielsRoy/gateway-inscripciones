import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { BuildingController } from './controllers/building.controller';
import { ClassroomController } from './controllers/classroom.controller';

@Module({
  controllers: [ScheduleController, BuildingController, ClassroomController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
