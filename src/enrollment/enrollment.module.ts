import { Module } from '@nestjs/common';
import { EnrollmentController } from './controllers/enrollment.controller';
import { ProcessorModule } from '../processor.module';

@Module({
  controllers: [EnrollmentController],
  imports: [
    ProcessorModule,
  ]
})
export class EnrollmentModule { }
