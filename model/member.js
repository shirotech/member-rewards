const Promise = require('bluebird');
const Model = require('./model');

class Member extends Model {

  get(id, reward) {
    return Promise.all([
      this._select({id}).first()
        .catch(Member._hasError)
        .then((data) => data || Member._notFound()),
      reward.getPoints(id)
    ]).then(([member, points]) => {
      member.points = points;
      return member;
    });
  }

  create(first_name, surname, dob) {
    return this._insert({first_name, surname, dob}, this.key)
      .catch(Member._hasError)
      .then(this._returnId.bind(this));
  }

  remove(id) {
    return this._delete({id})
      .catch(Member._hasError)
      .then((count) => count ? Member._ok() : Member._notFound());
  }

}

module.exports = new Member();