const { restart } = require('nodemon')
const {Comment}=require('../models')

const createUser = async (req, res)=>{
try {
        const {user_id, location_id, rating, content}= req.body
    
        const comment = await Comment.create({
            user_Id: user_id,
            location_Id: location_id,
            rating: rating,
            content: content
        })
    
        res.send(comment)
} catch (error) {
    throw error
}
}

const updateComment = async (req, res)=>{
try {
    const {comment_id}=req.params

    const comment = Comment.update(req.body, {where: {id: comment_id}, returning: true} )

    res.send(comment)
} catch (error) {
    throw error
}
}

const deleteComment = async (req, res)=>{
    try {
        const {comment_id}=req.params
        await Comment.destroy({where: {id: comment_id}})
        res.send({message: `Comment with id ${comment_id} has been deleted`})
    } catch (error) {
        throw error
    }
}

module.exports = {
    createUser, updateComment, deleteComment,
}