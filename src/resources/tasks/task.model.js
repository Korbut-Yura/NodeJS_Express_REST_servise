const uuid = require('uuid');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = Schema({
  _id: { type: String, default: uuid },
  title: String,
  order: { type: Number, default: 0 },
  description: String,
  userId: String,
  boardId: String,
  columnId: String
});

taskSchema.statics.toResponse = task => {
  const { _id, boardId, columnId, description, order, title, userId } = task;
  return { id: _id, boardId, columnId, description, order, title, userId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
