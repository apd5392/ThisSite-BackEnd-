const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const LocationRouter = require('./LocationRouter')


Router.use('/user',UserRouter)
Router.use('/location',LocationRouter)

module.exports = Router