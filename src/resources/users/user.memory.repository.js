const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const get = async id => {
  return User.findOne({ _id: id });
};

const getByParam = async params => {
  return User.findOne(params);
};

const add = async body => {
  return User.create(body);
};

const update = async (id, data) => {
  return User.findOneAndUpdate({ _id: id }, data);
};

const remove = async id => {
  return User.findOneAndRemove({ _id: id });
};

module.exports = { getAll, get, add, update, getByParam, remove };
