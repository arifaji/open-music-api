const Joi = require('joi');
const InvariantError = require('../exceptions/InvariantError');
const { validationSchema } = require('../util/enums');

const schemas = {};
schemas[validationSchema.INSERT_ALBUM] = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

schemas[validationSchema.INSERT_SONG] = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number().allow(null),
  albumId: Joi.string().allow(null),
});

const validate = (schema, payload) => {
  if (schemas[schema]) {
    const validSchema = schemas[schema].validate(
      {
        ...payload,
      },
      { abortEarly: false }
    );
    if (validSchema.error) {
      throw new InvariantError(validSchema.error);
    }
    return validSchema;
  }
  throw new Error(`${schema} schema validaton not found...`);
};

module.exports = {
  validate,
};
