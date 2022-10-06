require('dotenv').config()
module.exports = {
  development: {
    database: 'thissite',
    dialect: 'postgres',
    host: 'dpg-ccve3tkgqg460k4kvrsg-a',
    username: 'thissite_user',
    password: 'bp5C9YcduKjUf8hvxM1K809FLpxKS1dI'
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
