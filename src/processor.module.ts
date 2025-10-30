import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from './config/env';
import { KAFKA_SERVICE, PROCESSOR_SERVICE } from './config/services';
import { ProcessorService } from './processor.service';

@Module({
  imports: [
    ClientsModule.register([
      // { 
      //   name: PROCESSOR_SERVICE,
      //   transport: Transport.TCP,
      //   options: {
      //     host: envs.processorHost,
      //     port: envs.processorPort,
      //   }
      // },
      {
        name: PROCESSOR_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: [`nats://${envs.processorHost}:${envs.processorPort}`],
        },
      },
      { 
        name: KAFKA_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [`${envs.kafkaHost}:${envs.kafkaPort}`],
          },
        },
      },
    ]),
  ],
  providers: [ProcessorService],
  exports: [ProcessorService, ClientsModule],
})
export class ProcessorModule {}
