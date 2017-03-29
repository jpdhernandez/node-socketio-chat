const _ = require("lodash");

class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    const user = {id, name, room};
    
    this.users.push(user);

    return user;
  }

  removeUser (id) {
    var user = this.getUser(id);

    if (user) {
      this.users = _.filter(this.users, (user) => user.id !== id);
    }

    return user;
  }

  getUser (id) {
    return _.find(this.users, (user) => user.id === id);
  }

  getUserList (room) {
    const users = _.filter(this.users, (user) => user.room === room);
    const userNames = _.map(users, (user) => user.name);

    return userNames;
  }
}

module.exports = {Users};