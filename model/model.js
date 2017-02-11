const db = require('../db');

class Model {

  constructor(key = 'id') {
    this.key = key;
    this.tableName = this.constructor.name.toLowerCase();
  }

  static _ok() {
    return 200;
  }

  static _notFound() {
    throw 404;
  }

  static _hasError() {
    throw 500;
  }

  _returnId(data) {
    return {[this.key]: data[0]};
  }

  _insert(...args) {
    return db(this.tableName).insert(...args);
  }

  _select(...args) {
    return db(this.tableName).where(...args);
  }

  _update(where, data) {
    return db(this.tableName).where(...where).update(data);
  }

  _delete(...args) {
    return db(this.tableName).where(...args).del();
  }

}

module.exports = Model;