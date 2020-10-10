const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);

const add = user => tasksRepo.add(user);

const update = (taskId, data) => tasksRepo.update(taskId, data);

const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);

module.exports = {
  getAll,
  get,
  add,
  update,
  remove
};
