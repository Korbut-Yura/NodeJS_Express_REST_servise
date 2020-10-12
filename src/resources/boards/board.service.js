const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const add = user => boardsRepo.add(user);

const update = (id, data) => boardsRepo.update(id, data);

const remove = async boardId => {
  const tasks = await tasksService.getAll(boardId);
  tasks.forEach(({ id }) => tasksService.remove(boardId, id));
  boardsRepo.remove(boardId);
};

module.exports = {
  getAll,
  get,
  add,
  update,
  remove
};
