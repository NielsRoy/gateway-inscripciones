import { Module } from '@nestjs/common';
import { EnrollmentController } from './controllers/enrollment.controller';
import { TransportModule } from '../transport.module';

@Module({
  controllers: [EnrollmentController],
  imports: [
    TransportModule,
  ]
})
export class EnrollmentModule { }
