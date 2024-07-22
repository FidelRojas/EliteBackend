module.exports = {
  development: {
    username: 'dev',
    password: 'strongone',
    database: 'elite-db',
    host: '127.0.0.1',
    dialect: 'postgres',
    define: {
      timestamps: true
    }
  },
  test: {
    username: 'postgres',
    password: 'password',
    database: 'elite-db-test',
    host: '127.0.0.1',
    dialect: 'postgres',
    define: {
      timestamps: true
    },
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    logging: false
  }
}
