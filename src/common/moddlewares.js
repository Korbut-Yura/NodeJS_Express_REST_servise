function validateSchema(shema) {
  return (req, res, next) => {
    const { error } = shema.validate(req.body, {
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
