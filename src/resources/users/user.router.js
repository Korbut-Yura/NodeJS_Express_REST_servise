const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { validateSchema } = require('../../common/validators');
const { NotFoundError } = require('../../common/errors');
const { userSchema } = require('./user.schema');
const asyncHandler = require('../../common/asyncHandler');

router.route('/').get(
  asyncHandler(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  asyncHandler(async (req, res) => {
    const user = await usersService.get(req.params.id);
    if (!user) {
      throw new NotFoundError(`User ${req.params.id} not found`);
    }
    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  validateSchema(userSchema),
  asyncHandler(async (req, res) => {
    const user = await usersService.add(req.body);
    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  validateSchema(userSchema),
  asyncHandler(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  asyncHandler(async (req, res) => {
    const deletedUser = await usersService.remove(req.params.id);
    if (!deletedUser) {
      throw new NotFoundError(`User ${req.params.id} not found`);
    }
    res.status(204).send('The user has been deleted');
  })
);

module.exports = router;
