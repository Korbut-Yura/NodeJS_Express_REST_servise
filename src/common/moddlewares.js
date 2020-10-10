function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error && error.isJoi) {
      res.status(400).send('Bad request');
    } else {
      return next();
    }
  };
}

module.exports = { validateSchema };
