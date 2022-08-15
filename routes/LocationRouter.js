const Router = require("express").Router()
const controller = require("../controllers/locations")

Router.get("/", controller.getAllLocations)
module.exports = Router