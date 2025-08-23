import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  MATH_MICROSERVICE_HOST: string;
  MATH_MICROSERVICE_PORT: number;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  MATH_MICROSERVICE_HOST: joi.string().required(),
  MATH_MICROSERVICE_PORT: joi.number().required(),

})
.unknown(true);

const { error, value } = envsSchema.validate( process.env );


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  port: envVars.PORT,
  mathMicroserviceHost: envVars.MATH_MICROSERVICE_HOST,
  mathMicroservicePort: envVars.MATH_MICROSERVICE_PORT,
};