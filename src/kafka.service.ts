import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { KAFKA_SERVICE, KAFKA_TOPIC } from './config/services';
import type { ClientKafkaProxy } from '@nestjs/microservices';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
}

export interface KafkaPayload {
  method: HttpMethod;
  entity: any;
  body?: any;
}

@Injectable()
export class KafkaService implements OnModuleInit {

  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafkaProxy,
  ) {}

  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf(KAFKA_TOPIC);
    //await this.kafkaClient.connect();
  }

  send(payload: KafkaPayload) {
    return this.kafkaClient.send<string, KafkaPayload>(KAFKA_TOPIC, payload);
  }
}
