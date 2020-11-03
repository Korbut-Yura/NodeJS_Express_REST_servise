const { UnauthorizedError } = require('./errors');
const { JWT_SECRET_KEY } = require('./config');
const jwt = require('jsonwebtoken');
const util = require('util');
const asyncHandler = require('./asyncHandler');

const verify = util.promisify(jwt.verify);

const authorization = asyncHandler(async (req, res, next) => {
  try {
    const bearerHeader = req.header('Authorization');
    if (!bearerHeader) {
      throw new UnauthorizedError();
    }
    const [, token] = bearerHeader.split(' ');
    await verify(token, JWT_SECRET_KEY);

    return next();
  } catch (e) {
    throw new UnauthorizedError();
  }
});

module.exports = { authorization };
