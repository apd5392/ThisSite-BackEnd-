const Router = require("express").Router()
const controller = require("../controllers/locations")

Router.get("/", controller.getAllLocations)
Router.get("/:id", controller.getLocationById)
Router.post('/host',controller.hostLocation)
module.exports = Router