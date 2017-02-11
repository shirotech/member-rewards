exports.up = function(knex) {
  return knex.schema.createTable('member', (table) => {
      table.timestamps(true, true);
      table.increments(this.key);
      table.string('first_name');
      table.string('surname');
      table.date('dob');
    })
    .then(() => knex.schema.createTable('reward', (table) => {
      table.timestamps(true, true);
      table.increments(this.key);
      table.integer('member_id').unsigned().index().references('id').inTable('member').onDelete('CASCADE');
      table.integer('points').unsigned();
    }));
};

exports.down = function(knex, Promise) {
  return Promise.each(['member', 'reward'], (table) => knex.raw('DROP TABLE IF EXISTS ?? CASCADE', table));
};