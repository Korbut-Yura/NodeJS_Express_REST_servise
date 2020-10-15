const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { validateSchema, processNotFound } = require('../../common/validators');
const { userSchema } = require('./user.schema');

router.route('/').get(async (req, res, next) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
  next();
});

router.route('/:id').get(
  processNotFound(async (req, res, next) => {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
    next();
  })
);

router.route('/').post(validateSchema(userSchema), async (req, res, next) => {
  const user = await usersService.add(new User(req.body));
  res.json(User.toResponse(user));
  next();
});

router.route('/:id').put(
  validateSchema(userSchema),
  processNotFound(async (req, res, next) => {
    const user = await usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
    next();
  })
);

router.route('/:id').delete(
  processNotFound(async (req, res, next) => {
    await usersService.remove(req.params.id);
    res.status(204).send('The user has been deleted');
    next();
  })
);

module.exports = router;
