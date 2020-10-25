const Task = require('./task.model');

const getAll = async params => {
  return Task.find(params);
};

const get = async (boardId, taskId) => {
  return Task.findOne({ boardId, _id: taskId });
};

const add = async task => {
  return Task.create(task);
};

const update = async (taskId, data) => {
  return Task.findOneAndUpdate({ _id: taskId }, data);
};

const remove = async (boardId, taskId) => {
  return Task.findOneAndRemove({ boardId, _id: taskId });
};

module.exports = {
  getAll,
  get,
  add,
  update,
  remove
};
