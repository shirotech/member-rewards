module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'member_rewards',
      user:     'member_rewards_dev'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: '/run/postgresql',
      database: 'member_rewards',
      user:     'member_rewards_prod'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};