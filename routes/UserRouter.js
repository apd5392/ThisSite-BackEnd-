const Router = require('express').Router()
const controller = require('../controllers/users')

Router.post('/signup', controller.createUser)
Router.post('/login', controller.login)
Router.put('/:id', controller.updateUser)
Router.delete('/:id', controller.deleteUser)

module.exports = Router
