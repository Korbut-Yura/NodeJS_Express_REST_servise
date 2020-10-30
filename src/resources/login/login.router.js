const router = require('express').Router();
const { ForbiddenError } = require('../../common/errors');
const loginService = require('./login.service');

const asyncHandler = require('../../common/asyncHandler');

router.route('/').post(
  asyncHandler(async (req, res) => {
    const token = await loginService.login(req.body);
    if (!token) {
      throw new ForbiddenError();
    }
    res.json({ token });
  })
);

module.exports = router;
