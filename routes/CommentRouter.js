const Router = require('express').Router()
const controller = require('../controllers/comments.js')
const middleware = require('../middleware')

Router.get('/like/:comment_id', controller.likeButton)
Router.get('/dislike/:comment_id', controller.dislikeButton)
Router.post(
  '/',

  controller.createComment
)
Router.put(
  '/:comment_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateComment
)
Router.delete(
  '/:comment_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteComment
)
module.exports = Router
