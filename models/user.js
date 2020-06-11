const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    return getDb().collection('users').insertOne(this);
  }

  static findByPk(id) {
    return getDb().collection('users')
      .findOne({ _id: mongodb.ObjectId(id) });
  }
}

module.exports = User;