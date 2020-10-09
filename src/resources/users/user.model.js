const uuid = require('uuid');

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static mergeUser(newUser, prevUser) {
    return {
      id: prevUser.id,
      name: newUser.name || prevUser.name,
      login: newUser.login || prevUser.login,
      password: newUser.password || prevUser.password
    };
  }
}

module.exports = User;
