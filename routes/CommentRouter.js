const Router = require('express').Router()
const controller = require('../controllers/comments.js')

Router.get('/:comment_id',controller.likeButton)
Router.post('/',controller.createComment)
Router.put('/:comment_id', controller.updateComment)
Router.delete('/:comment_id', controller.deleteComment)
module.exports = Router