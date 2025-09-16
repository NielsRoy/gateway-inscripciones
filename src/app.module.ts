import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { StudyPlanModule } from './study-plan/study-plan.module';
import { ScheduleModule } from './schedule/schedule.module';
import { RegistrationModule } from './registration/registration.module';
import { ProcessorModule } from './processor.module';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DeduplicateInterceptor } from './interceptors/deduplicate/deduplicate.interceptor';
import { CacheService } from './cache.service';
import { CommonModule } from './common/common.module';
import { envs } from './config/env';

@Module({
  imports: [
    TeacherModule,
    StudentModule,
    StudyPlanModule,
    ScheduleModule,
    RegistrationModule,
    ProcessorModule,
    CacheModule.register({
      stores: [
        new KeyvRedis(`redis://${envs.redisHost}:${envs.redisPort}`)
      ],
      isGlobal: true,
      ttl: 1000 * 60,
    }),
    CommonModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DeduplicateInterceptor,
    },
    CacheService,
  ],
})
export class AppModule {}
