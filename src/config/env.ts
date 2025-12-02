import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  STATE: 'production' | 'development';

  PORT: number;
  JWT_SECRET: string;
  
  NATS_SERVER_URL: string;
}

const envsSchema = joi.object({
  STATE: joi.allow('production','development').required(),
  PORT: joi.number().required(),
  JWT_SECRET: joi.string().required(),
  
  NATS_SERVER_URL: joi.string().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate( process.env );


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;

export const env = {
  STATE: envVars.STATE,
  PORT: envVars.PORT,
  JWT_SECRET: envVars.JWT_SECRET,
  
  NATS_SERVER_URL: envVars.NATS_SERVER_URL,
};