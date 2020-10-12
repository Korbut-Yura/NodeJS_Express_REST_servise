const Joi = require('joi');

const taskSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string().required(),
  order: Joi.number(),
  description: Joi.string(),
  userId: Joi.string().allow(null),
  boardId: Joi.string().allow(null),
  columnId: Joi.string().allow(null)
});

module.exports = { taskSchema };
