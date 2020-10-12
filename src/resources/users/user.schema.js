const Joi = require('joi');

const userSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  login: Joi.string(),
  password: Joi.string()
});

module.exports = { userSchema };
