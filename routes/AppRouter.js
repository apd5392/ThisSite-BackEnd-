const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const LocationRouter = require('./LocationRouter')
const CommentRouter = require('./CommentRouter')
const BookingsRouter = require('./BookingsRouter')

Router.use('/user',UserRouter)
Router.use('/location',LocationRouter)
Router.use('/comment', CommentRouter)
Router.use('/booking',BookingsRouter)

module.exports = Router 