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

const remove = async id => {
  const success = db.delete(id);
  if (!success) {
    throw new Error(`Error: user with id ${id} not found`);
  }
};

module.exports = { getAll, get, add, remove };
