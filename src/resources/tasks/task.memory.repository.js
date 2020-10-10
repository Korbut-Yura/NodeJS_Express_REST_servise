const db = new Map();

const getAll = async boardId => {
  return Array.from(db.values()).filter(board => boardId === board.boardId);
};

const get = async (boardId, taskId) => {
  const task = db.get(taskId);
  if (!task) {
    throw new Error(`Error: Task with id ${taskId} not found`);
  }
  return task;
};

const add = async task => {
  db.set(task.id, task);
  return task;
};

const update = async (taskId, data) => {
  const task = await get(data.boardId, taskId);
  return task.update(data);
};

const remove = async (boardId, taskId) => {
  const success = db.delete(taskId);
  if (!success) {
    throw new Error(`Error: Task with id ${taskId} not found`);
  }
};

module.exports = { getAll, get, add, update, remove };
