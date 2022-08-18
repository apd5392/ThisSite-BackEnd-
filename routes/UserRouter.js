const Router = require('express').Router()
const controller = require('../controllers/users')
const middleware = require('../middleware')
Router.post('/signup', controller.createUser)
Router.post('/login', controller.login)
Router.put('/:id', controller.updateUser)
Router.delete('/:id', controller.deleteUser)
Router.get(
  '/session',

  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = Router
