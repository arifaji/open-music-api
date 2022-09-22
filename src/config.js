const Joi = require('joi');

const envs = ['dev', 'prod'];

// Config Schema
const schema = Joi.object().keys({
  port: Joi.number().default(5000),
  env: Joi.string()
    .valid(...envs)
    .default(envs[0]),
  host: Joi.string(),
});

// Build config
const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  host: process.env.NODE_ENV !== envs[1] ? 'localhost' : '0.0.0.0',
};

// Validate
const { error, value } = schema.validate(config);

// Throw if config is invalid
if (error) {
  throw new Error(`The server config is invalid. ${error.message}`);
}

// Property Helper
value.isDev = value.env === 'dev';

module.exports = value;
