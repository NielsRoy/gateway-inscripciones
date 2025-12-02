import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { TransportModule } from '../transport.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from '../config/env';

@Module({
  controllers: [StudentController],
  imports: [
    TransportModule,
    JwtModule.register({
      global: true,
      secret: envs.JWT_SECRET
    })
  ],
})
export class StudentModule { }
