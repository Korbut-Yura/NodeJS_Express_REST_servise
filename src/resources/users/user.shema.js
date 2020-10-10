const Joi = require('joi');

const userShema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  login: Joi.string(),
  password: Joi.string()
});

module.exports = { userShema };
