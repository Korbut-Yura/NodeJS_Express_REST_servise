const Joi = require('joi');

const boardSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  columns: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      title: Joi.string(),
      order: Joi.number()
    })
  )
});

module.exports = { boardSchema };
