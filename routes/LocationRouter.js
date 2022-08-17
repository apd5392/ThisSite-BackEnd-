const Router = require("express").Router()
const controller = require("../controllers/locations")

Router.get("/", controller.getAllLocations)
Router.get("/:id", controller.getLocationById)
Router.get('/host/:userId', controller.getUserHostedLocations)
Router.post('/search', controller.filterLocations)
Router.post('/host',controller.hostLocation)
Router.put('/:id', controller.updateLocation)
Router.delete('/:id', controller.deleteLocation)



module.exports = Router