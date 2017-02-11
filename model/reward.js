const Model = require('./model');

class Reward extends Model {

  add(points, member_id) {
    return this._insert({member_id, points}, this.key)
      .catch(Reward._hasError)
      .then(this._returnId.bind(this));
  }

  remove(id) {
    return this._delete({id})
      .catch(Reward._hasError)
      .then((count) => count ? Reward._ok() : Reward._notFound());
  }

  associate(id, member_id) {
    return this._update([this.key, id], {member_id})
      .catch(Reward._hasError)
      .then((count) => count ? Reward._ok() : Reward._notFound());
  }

  getPoints(member_id) {
    return this._select({member_id}).sum('points')
      .catch(Reward._hasError)
      .then((points) => parseInt(points[0].sum) || 0);
  }

}

module.exports = new Reward();