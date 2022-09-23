const Joi = require('joi');
const InvariantError = require('../exceptions/InvariantError');

const insertAlbum = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

const insertSong = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number().allow(null),
  albumId: Joi.string().allow(null),
});

const validate = (schema, payload) => {
  const schemas = {
    insertAlbum,
    insertSong,
  };
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
