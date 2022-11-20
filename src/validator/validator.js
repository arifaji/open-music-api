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

schemas[validationSchema.INSERT_USER] = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

schemas[validationSchema.LOGIN_USER] = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

schemas[validationSchema.REFRESH_TOKEN] = Joi.object({
  refreshToken: Joi.string().required(),
});

schemas[validationSchema.INSERT_PLAYLIST] = Joi.object({
  name: Joi.string().required(),
});

schemas[validationSchema.INSERT_SONG_PLAYLIST] = Joi.object({
  songId: Joi.string().required(),
});

schemas[validationSchema.COLLABORATION] = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

schemas[validationSchema.EXPORT_PLAYLIST] = Joi.object({
  targetEmail: Joi.string().email().required(),
});

schemas[validationSchema.ALBUM_COVER_IMG] = Joi.object({
  'content-type': Joi.string()
    .valid(
      'image/apng',
      'image/avif',
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/webp'
    )
    .required(),
}).unknown();

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
