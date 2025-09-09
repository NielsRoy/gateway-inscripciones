import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  KAFKA_HOST: string;
  KAFKA_PORT: number;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  KAFKA_HOST: joi.string().required(),
  KAFKA_PORT: joi.number().required(),

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
};