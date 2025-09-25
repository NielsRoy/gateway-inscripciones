import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from './config/env';
import { KAFKA_SERVICE, PROCESSOR_SERVICE } from './config/services';
import { ProcessorService } from './processor.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PROCESSOR_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.processorHost,
          port: envs.processorPort,
        }
      },
      {
        name: KAFKA_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [`${envs.kafkaHost}:${envs.kafkaPort}`],
          },
          consumer: {
            groupId: 'no-consumer',
            allowAutoTopicCreation: false, // de todas maneras en Kafka ya no se permite la creación automática de topics
          },
          producer: {
            allowAutoTopicCreation: false,
            // idempotent: true,
          },
        },
      },
    ]),
  ],
  providers: [ProcessorService],
  exports: [ProcessorService],
})
export class ProcessorModule {}
