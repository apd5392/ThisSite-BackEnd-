const Router = require('express').Router()
const controller = require('../controllers/locations')
const middleware = require('../middleware')

Router.get('/', controller.getAllLocations)
Router.get('/:id', controller.getLocationById)
Router.get('/hosted/:user_Id', controller.getHostedLocationsById)
Router.get('/booked/:user_Id', controller.getBookedLocationsById)
Router.post('/search', controller.filterLocations)
Router.post(
  '/host',
  middleware.stripToken,
  middleware.verifyToken,
  controller.hostLocation
)
Router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateLocation
)
Router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteLocation
)

module.exports = Router
