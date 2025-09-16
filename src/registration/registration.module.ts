import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './controllers/registration.controller';
import { TermController } from './controllers/term.controller';
import { PeriodController } from './controllers/period.controller';
import { SubjectGroupController } from './controllers/subject-group.controller';
import { GroupScheduleController } from './controllers/group-schedule.controller';
import { ProcessorModule } from 'src/processor.module';
import { RegistrationDetailController } from './controllers/registration-detail.controller';

@Module({
  controllers: [
    RegistrationController,
    RegistrationDetailController,
    TermController,
    PeriodController,
    SubjectGroupController,
    GroupScheduleController,
  ],
  providers: [RegistrationService],
  imports: [ProcessorModule],
})
export class RegistrationModule {}
