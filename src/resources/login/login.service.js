const userService = require('../users/user.service');
const bcrypt = require('bcrypt');
const util = require('util');
const { JWT_SECRET_KEY } = require('../../common/config');
const jwt = require('jsonwebtoken');

const compare = util.promisify(bcrypt.compare);
const sign = util.promisify(jwt.sign);

const login = async params => {
  const { login, password } = params;
  const user = await userService.getByParam({ login });
  if (user) {
    const { password: hashedPassword } = user;
    const result = await compare(password, hashedPassword);
    if (result) {
      const token = await sign(
        { id: user._id, login: user.login },
        JWT_SECRET_KEY
      );
      return token;
    }
    return null;
  }
  return null;
};

module.exports = { login };
