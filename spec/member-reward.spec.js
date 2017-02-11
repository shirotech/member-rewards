const member = require('../model/member');
const reward = require('../model/reward');

let member_id, _points,
    first_name = 'Foo',
    surname = 'Bar',
    dob = new Date(1988, 5, 24);

describe('Member', () => {

  it('Should initialise', () => {
    expect(member.key).toBe('id');
    expect(member.tableName).toBe('member');
  });

  describe('create', () => {

    beforeAll((done) => {
      member.create(first_name, surname, dob).then((data) => {
        member_id = data.id;
      }).then(done);
    });

    it('Should return the id', () => {
      expect(member_id).toEqual(jasmine.any(Number));
    });

  });

  describe('get', () => {

    it('Should return the correct member', (done) => {
      member.get(member_id, reward).then((data) => {
        _points = data.points;
        expect(data.first_name).toBe(first_name);
        expect(data.surname).toBe(surname);
        expect(data.dob).toEqual(dob);
      }).then(done);
    });

  });

});

describe('Reward', () => {

  describe('add and getPoints', () => {

    beforeAll((done) => {
      reward.getPoints(member_id).then((points) => {
        _points = points + 100;
      }).then(() => reward.add(100, member_id)).then(done);
    });

    it('Should add the points', (done) => {
      reward.getPoints(member_id).then((points) => {
        expect(_points).toBe(points);
      }).then(done);
    });

  });

  describe('associate and getPoints', () => {

    beforeAll((done) => {
      reward.getPoints(member_id).then((points) => {
        _points = points + 100;
      }).then(() => reward.add(100))
        .then((data) => reward.associate(data.id, member_id)).then(done);
    });

    it('Should associate the reward', (done) => {
      reward.getPoints(member_id).then((points) => {
        expect(_points).toBe(points);
      }).then(done);
    });

  });

  describe('remove and getPoints', () => {

    beforeAll((done) => {
      reward.getPoints(member_id).then((points) => {
        _points = points;
      }).then(() => reward.add(100))
        .then((data) => reward.remove(data.id, member_id)).then(done);
    });

    it('Should remove the points', (done) => {
      reward.getPoints(member_id).then((points) => {
        expect(_points).toBe(points);
      }).then(done);
    });

  });

});

describe('Cleanup', () => {
  it('Should remove the member', (done) => {
    member.remove(member_id)
      .then(() => member.get(member_id, reward))
      .catch((status) => expect(status).toBe(404))
      .then(done);
  });
});