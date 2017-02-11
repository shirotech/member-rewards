exports.seed = function(knex) {
  return knex('member').insert([
      {first_name: 'John', surname: 'Doe', dob: new Date(1985, 5, 24)},
      {first_name: 'Peter', surname: 'Smith', dob: new Date(1986, 3, 14)}
    ])
    .then(() => knex('reward').insert([
      {points: 100, member_id: 1},
      {points: 200},
      {points: 300}
    ]));
};