const uuid = require('uuid');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
  _id: { type: String, default: uuid },
  name: String,
  login: String,
  password: String
});

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
