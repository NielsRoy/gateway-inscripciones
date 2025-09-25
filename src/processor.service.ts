import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import type { ClientKafkaProxy, ClientProxy } from '@nestjs/microservices';
import { KAFKA_SERVICE, KAFKA_TOPIC, PROCESSOR_MESSAGE_PATTERN, PROCESSOR_SERVICE } from './config/services';
import { ProcessorPayload } from './common/interfaces/processor.interface';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProcessorService {

  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafkaProxy,
    @Inject(PROCESSOR_SERVICE) private readonly processorClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  handleRequest(payload: ProcessorPayload, async: boolean, responseHash: string, topicName: string) {
    if (async) {
      return this.emit(payload);
    }

    return this.send(payload, responseHash);
  }

  private emit(payload: ProcessorPayload) {
    return this.kafkaClient.emit<string, ProcessorPayload>(
      topicName,
      payload,
    );
  }

  private async send(payload: ProcessorPayload, responseHash: string) {
    const { hash } = payload;
    let result;
    try {
      result = await lastValueFrom(this.processorClient.send<string, ProcessorPayload>(PROCESSOR_MESSAGE_PATTERN, payload));
      return result;
    } catch(error) {
      //console.log('Error en processor.service: ', error);
      result = error;
      throw error;
    }
    finally {
      await this.cacheManager.set(responseHash, result);
      const value = await this.cacheManager.get(hash);
      if (value) {
        await this.cacheManager.del(hash);
      }
    }
  }
}
