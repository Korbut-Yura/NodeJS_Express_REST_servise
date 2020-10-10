const taskService = require('../tasks/task.service');
const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const add = user => usersRepo.add(user);

const update = (id, data) => usersRepo.update(id, data);

const remove = async id => {
  const usersTasks = await taskService.getAllByUserId(id);
  usersTasks.forEach(task => task.update({ userId: null }));
  usersRepo.remove(id);
};

module.exports = { getAll, get, add, update, remove };
