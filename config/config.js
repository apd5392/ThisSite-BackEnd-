require('dotenv').config()
module.exports = {
  development: {
    database: 'thissite',
    dialect: 'postgres'
  },
  test: {
    database: 'thissite',
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
