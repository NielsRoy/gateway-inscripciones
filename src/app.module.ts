import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MATH_SERVICE } from './config/services';
import { envs } from './config/env';

@Module({
  imports: [
    ClientsModule.register([
      { 
        name: MATH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.mathMicroserviceHost,
          port: envs.mathMicroservicePort,
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
