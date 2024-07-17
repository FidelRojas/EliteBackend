module.exports = {
  development: {
    username: 'postgres',
    password: 'password',
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
    username: 'root',
    password: null,
    database: 'elite-db-prod',
    host: '127.0.0.1',
    dialect: 'postgres',
    NODE_ENV: 'production',
    define: {
      schema: 'public',
      timestamps: true
    },
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    },
    use_env_variable: 'DATABASE_URL',
    logging: false
  }
}
