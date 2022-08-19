require('dotenv').config()
module.exports = {
  development: {
    database: 'thisSite',
    dialect: 'postgres'
  },
  test: {
    database: 'thisSite',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
