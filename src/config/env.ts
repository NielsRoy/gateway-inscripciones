import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  JWT_SECRET: string;
  
  NATS_HOST: string;
  NATS_PORT: number;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  JWT_SECRET: joi.string().required(),
  
  NATS_HOST: joi.string().required(),
  NATS_PORT: joi.number().required(),
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
  
  NATS_HOST: envVars.NATS_HOST,
  NATS_PORT: envVars.NATS_PORT,
};