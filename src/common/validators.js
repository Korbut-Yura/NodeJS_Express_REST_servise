const { ValidationError } = require('../common/errors');
const asyncHandler = require('./asyncHandler');

function validateSchema(schema) {
  return asyncHandler(async (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error && error.isJoi) {
      throw new ValidationError();
    }
    next();
  });
}

module.exports = { validateSchema };
