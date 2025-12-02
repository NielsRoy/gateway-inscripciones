import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { env } from './config/env';
import { NATS_SERVICE } from './config/injection-tokens';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: [env.NATS_SERVER_URL],
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class TransportModule {}
