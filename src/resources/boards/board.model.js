const uuid = require('uuid');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardSchema = Schema({
  _id: { type: String, default: uuid },
  title: String,
  columns: [
    {
      _id: { type: String, default: uuid },
      title: String,
      order: { type: Number, default: 0 }
    }
  ]
});

boardSchema.statics.toResponse = (board = {}) => {
  const { _id, title, columns } = board;
  return {
    id: _id,
    title,
    columns: columns.map(i => {
      const { title, order } = i;
      return { title, order };
    })
  };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
