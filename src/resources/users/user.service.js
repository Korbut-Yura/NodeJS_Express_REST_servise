const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const add = user => usersRepo.add(user);

const remove = id => usersRepo.remove(id);

module.exports = { getAll, get, add, remove };
