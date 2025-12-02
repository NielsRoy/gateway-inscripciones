import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from './config/env';
import { NATS_SERVICE } from './config/injection-tokens';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: [`nats://${envs.NATS_HOST}:${envs.NATS_PORT}`],
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class TransportModule {}
