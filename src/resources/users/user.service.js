const taskService = require('../tasks/task.service');
const usersRepo = require('./user.memory.repository');
const bcrypt = require('bcrypt');
const util = require('util');
const saltRounds = 10;

const hash = util.promisify(bcrypt.hash);

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const getByParam = params => usersRepo.getByParam(params);

const add = async user => {
  const hashedPassword = await hash(user.password, saltRounds);

  return usersRepo.add({ ...user, password: hashedPassword });
};

const update = (id, data) => usersRepo.update(id, data);

const remove = async id => {
  const usersTasks = await taskService.getAll({ userId: id });
  usersTasks.forEach(task => taskService.update(task._id, { userId: null }));

  return usersRepo.remove(id);
};

module.exports = { getAll, get, add, update, getByParam, remove };
