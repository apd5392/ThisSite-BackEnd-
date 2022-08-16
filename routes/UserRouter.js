const Router = require('express').Router()
const controller = require('../controllers/users')

Router.post('/signup', controller.createUser)
Router.post('/login', controller.login)

module.exports = Router
