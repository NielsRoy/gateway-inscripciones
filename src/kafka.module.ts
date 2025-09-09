import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_SERVICE } from './config/services';
import { envs } from './config/env';
import { KafkaService } from './kafka.service';

@Module({
  imports: [
    ClientsModule.register([
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
  providers: [KafkaService],
  exports: [KafkaService],
  //exports: [ClientsModule],
})
export class KafkaModule {}
