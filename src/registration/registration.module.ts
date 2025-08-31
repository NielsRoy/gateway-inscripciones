import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { YearController } from './controllers/year.controller';
import { PeriodController } from './controllers/period.controller';
import { SubjectGroupController } from './controllers/subject-group.controller';
import { GroupScheduleController } from './controllers/group-schedule.controller';

@Module({
  controllers: [
    RegistrationController,
    YearController,
    PeriodController,
    SubjectGroupController,
    GroupScheduleController,
  ],
  providers: [RegistrationService],
})
export class RegistrationModule {}
