import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from './config/env';
import { KAFKA_SERVICE, PROCESSOR_SERVICE } from './config/services';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PROCESSOR_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: [`nats://${envs.PROCESSOR_HOST}:${envs.PROCESSOR_PORT}`],
        },
      },
      { 
        name: KAFKA_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [`${envs.KAFKA_HOST}:${envs.KAFKA_PORT}`],
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class ProcessorModule {}
