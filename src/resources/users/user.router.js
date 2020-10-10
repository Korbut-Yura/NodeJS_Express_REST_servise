const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { validateSchema } = require('../../common/moddlewares');
const { userSchema } = require('./user.schema');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  } catch (e) {
    res.status(404).send('User not found');
  }
});

router.route('/').post(validateSchema(userSchema), async (req, res) => {
  const user = await usersService.add(new User(req.body));
  res.json(User.toResponse(user));
});

router.route('/:id').put(validateSchema(userSchema), async (req, res) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
  } catch (e) {
    res.status(404).send('User not found');
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.remove(req.params.id);
    res.status(204).send('The user has been deleted');
  } catch (e) {
    res.status(404).send('User not found');
  }
});

module.exports = router;
