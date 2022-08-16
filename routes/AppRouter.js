const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const LocationRouter = require('./LocationRouter')
const CommentRouter = require('./CommentRouter')

Router.use('/user',UserRouter)
Router.use('/location',LocationRouter)
Router.use('/comment', CommentRouter)

module.exports = Router 