import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { ProcessorModule } from 'src/processor.module';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService],
  imports: [ProcessorModule],
})
export class TeacherModule {}
