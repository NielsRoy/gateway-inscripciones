import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  KAFKA_HOST: string;
  KAFKA_PORT: number;
  PROCESSOR_HOST: string;
  PROCESSOR_PORT: number;
  REDIS_HOST: string;
  REDIS_PORT: number;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  KAFKA_HOST: joi.string().required(),
  KAFKA_PORT: joi.number().required(),
  PROCESSOR_HOST: joi.string().required(),
  PROCESSOR_PORT: joi.number().required(),
  REDIS_HOST: joi.string().required(),
  REDIS_PORT: joi.number().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate( process.env );


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  port: envVars.PORT,
  kafkaHost: envVars.KAFKA_HOST,
  kafkaPort: envVars.KAFKA_PORT,
  processorHost: envVars.PROCESSOR_HOST,
  processorPort: envVars.PROCESSOR_PORT,
  redisHost: envVars.REDIS_HOST,
  redisPort: envVars.REDIS_PORT,
};