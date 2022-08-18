const Router = require('express').Router()
const controller = require('../controllers/bookings')

Router.post('/', controller.createBooking)

module.exports = Router
