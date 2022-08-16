const Router = require('express').Router()
const controller = require('../controllers/comments.js')

Router.post('/',controller.createUser)
Router.put('/:comment_id', controller.updateComment)
Router.delete('/:comment_id', controller.deleteComment)
module.exports = Router