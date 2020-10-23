const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const get = async id => {
  return Board.findOne({ _id: id });
};

const add = async board => {
  return Board.create(board);
};

const update = async (id, data) => {
  return Board.findOneAndUpdate({ _id: id }, data);
};

const remove = async id => {
  return Board.findOneAndRemove({ _id: id });
};

module.exports = { getAll, get, add, update, remove };
