const db = new Map();

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return Array.from(db.values());
};

const get = async id => {
  const user = db.get(id);
  if (!user) {
    throw new Error(`Error: user with id ${id} not found`);
  }
  return user;
};

const add = async user => {
  db.set(user.id, user);
  return user;
};

const update = async (id, data) => {
  const user = await get(id);
  return user.update(data);
};

const remove = async id => {
  const success = db.delete(id);
  if (!success) {
    throw new Error(`Error: user with id ${id} not found`);
  }
};

module.exports = { getAll, get, add, update, remove };
