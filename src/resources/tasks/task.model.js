const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title,
    order = 0,
    description = 'DESCRIPTION',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  update(newProps) {
    const { title, order, description, userId, boardId, columnId } = newProps;
    Object.assign(this, {
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    });
    return this;
  }

  static toResponse(task) {
    const { id, boardId, columnId, description, order, title, userId } = task;
    return { id, boardId, columnId, description, order, title, userId };
  }
}

module.exports = Task;
