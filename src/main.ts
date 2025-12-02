import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config/env';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcExceptionFilter } from './common/filters/rpc-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.useGlobalFilters(new RpcExceptionFilter());

  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Sistema de inscripciones - API')
    .setDescription('Sistema de inscripciones - Endpoints')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const apiDocPath = 'api';
  SwaggerModule.setup(apiDocPath, app, documentFactory);

  await app.listen(env.PORT, '0.0.0.0');
  logger.log(`App running in ${env.STATE} state`);
  logger.log(`See the api doc on: http://localhost:${env.PORT}/${apiDocPath}`);
}
bootstrap();
