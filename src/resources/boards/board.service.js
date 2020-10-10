const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const add = user => boardsRepo.add(user);

const update = (id, data) => boardsRepo.update(id, data);

const remove = id => boardsRepo.remove(id);

module.exports = {
  getAll,
  get,
  add,
  update,
  remove
};
