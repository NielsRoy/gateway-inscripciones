import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { TransportModule } from '../transport.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from '../config/env';

@Module({
  controllers: [StudentController],
  imports: [
    TransportModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET
    })
  ],
})
export class StudentModule { }
