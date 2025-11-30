import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  JWT_SECRET: string;
  KAFKA_HOST: string;
  KAFKA_PORT: number;
  PROCESSOR_HOST: string;
  PROCESSOR_PORT: number;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  JWT_SECRET: joi.string().required(),
  KAFKA_HOST: joi.string().required(),
  KAFKA_PORT: joi.number().required(),
  PROCESSOR_HOST: joi.string().required(),
  PROCESSOR_PORT: joi.number().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate( process.env );


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  PORT: envVars.PORT,
  JWT_SECRET: envVars.JWT_SECRET,
  KAFKA_HOST: envVars.KAFKA_HOST,
  KAFKA_PORT: envVars.KAFKA_PORT,
  PROCESSOR_HOST: envVars.PROCESSOR_HOST,
  PROCESSOR_PORT: envVars.PROCESSOR_PORT,
};