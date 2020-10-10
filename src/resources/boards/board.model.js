const uuid = require('uuid');
const Column = require('./column.model');

class Board {
  constructor({ id = uuid(), title = 'TITLE', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = this.createColumns(columns);
  }

  createColumns(columns) {
    return columns.map(column => new Column(column));
  }

  update(newProps) {
    const { title, columns } = newProps;

    Object.assign(this, {
      title,
      columns: this.createColumns(columns)
    });

    return this;
  }
  static toResponse(board) {
    return { ...board };
  }
}

module.exports = Board;
