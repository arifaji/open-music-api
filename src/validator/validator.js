const Joi = require('joi');

const insertAlbum = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

const validate = (schema, payload) => {
  const schemas = {
    insertAlbum,
  };
  if (schemas[schema]) {
    return schemas[schema].validate({
      payload,
    });
  }
  throw new Error(`${schema} schema validaton not found...`);
};

module.exports = {
  validate,
};
