const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { validateSchema, processNotFound } = require('../../common/validators');
const { userSchema } = require('./user.schema');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(
  processNotFound(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  })
);

router.route('/').post(validateSchema(userSchema), async (req, res) => {
  const user = await usersService.add(new User(req.body));
  res.json(User.toResponse(user));
});

router.route('/:id').put(
  validateSchema(userSchema),
  processNotFound(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  processNotFound(async (req, res) => {
    await usersService.remove(req.params.id);
    res.status(204).send('The user has been deleted');
  })
);

module.exports = router;
