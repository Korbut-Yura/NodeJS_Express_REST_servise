const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    console.log('user id', user);
    res.json(User.toResponse(user));
  } catch (e) {
    res.status(404).send('User not found');
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.add(new User(req.body));

  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const prevUser = await usersService.get(req.params.id);
  const user = await usersService.add(User.mergeUser(req.body, prevUser));
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  try {
    const status = await usersService.remove(req.params.id);
    console.log('status', status);
    res.status(204).send('The user has been deleted');
  } catch (e) {
    res.status(404).send('User not found');
  }
});

module.exports = router;
