import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/env';
import { Logger, ValidationPipe } from '@nestjs/common';
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

  const config = new DocumentBuilder()
    .setTitle('Sistema de inscripciones - API')
    .setDescription('Sistema de inscripciones - Endpoints')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const apiDocPath = 'api';
  SwaggerModule.setup(apiDocPath, app, documentFactory);

  await app.listen(envs.PORT);
  logger.log(`App running on port: ${envs.PORT}`);
  logger.log(`See the api doc on: http://localhost:${envs.PORT}/${apiDocPath}`);
}
bootstrap();
