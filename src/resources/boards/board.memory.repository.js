const db = new Map();

const getAll = async () => {
  return Array.from(db.values());
};

const get = async id => {
  const board = db.get(id);
  if (!board) {
    throw new Error(`Error: board with id ${id} not found`);
  }
  return board;
};

const add = async board => {
  db.set(board.id, board);
  return board;
};

const update = async (id, data) => {
  const user = await get(id);
  return user.update(data);
};

const remove = async id => {
  const success = db.delete(id);
  if (!success) {
    throw new Error(`Error: board with id ${id} not found`);
  }
};

module.exports = { getAll, get, add, update, remove };
