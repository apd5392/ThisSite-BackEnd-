const Router = require("express").Router()
const controller = require("../controllers/locations")

Router.get("/", controller.getAllLocations)
Router.get("/hosted/:user_Id", controller.getHostedLocationsById)
Router.get('/booked/:user_Id', controller.getBookedLocationsById)
Router.post('/search', controller.filterLocations)
Router.post('/host',controller.hostLocation)
Router.put('/:id', controller.updateLocation)
Router.delete('/:id', controller.deleteLocation)



module.exports = Router