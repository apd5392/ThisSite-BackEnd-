const Router = require('express').Router()
const controller = require('../controllers/users')
const middleware = require('../middleware')

Router.get('/', (req, res) => res.json({ message: 'From user Router' }))

Router.post('/signup', controller.createUser)
Router.post('/login', controller.login)
Router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateUser
)
Router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteUser
)
Router.get(
  '/session',

  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = Router
